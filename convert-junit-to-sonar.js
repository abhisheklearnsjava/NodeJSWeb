// convert-junit-to-sonar.js
const fs = require('fs');
const xml2js = require('xml2js');

const input = './junit.xml';
const output = './sonar-test.xml';

xml2js.parseString(fs.readFileSync(input), (err, result) => {
  if (err) throw err;

  const suites = result.testsuites.testsuite;
  let sonarXml = `<testExecutions version="1">\n`;

  suites.forEach(suite => {
    const testcases = suite.testcase || [];
    testcases.forEach(test => {
      sonarXml += `  <file path="server.js">\n`;

      const duration = Math.round(parseFloat(test.$.time || '0') * 1000);
      const name = test.$.name || 'Unnamed test';

      if (test.failure) {
        const failureText = test.failure[0]._ || 'Test failed';
        sonarXml += `    <testCase name="${escapeXml(name)}" duration="${duration}">\n`;
        sonarXml += `      <failure message="Test failed">${escapeXml(failureText)}</failure>\n`;
        sonarXml += `    </testCase>\n`;
      } else {
        sonarXml += `    <testCase name="${escapeXml(name)}" duration="${duration}" />\n`;
      }

      sonarXml += `  </file>\n`;
    });
  });

  sonarXml += `</testExecutions>\n`;
  fs.writeFileSync(output, sonarXml);
});

// Helper to escape XML special characters
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, c => {
    return {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      "'": '&apos;',
      '"': '&quot;'
    }[c];
  });
}