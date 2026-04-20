const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'server', 'routes', 'payment.js');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add validation logging
const validationRegex = /if \(!errors\.isEmpty\(\)\) \{([\s\S]+?)return res\.status\(400\)\.json\(\{([\s\S]+?)\}\);[\s\n\r]*\}/;
const validationReplacement = `if (!errors.isEmpty()) {
      const errorDetails = errors.array().map(err => \`\${err.path}: \${err.msg}\`);
      console.error(\`[PAYMENT] Validation Error - Body: \${JSON.stringify(req.body)}, Errors: \${errorDetails.join(', ')}\`);
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array().map(err => err.msg)
      });
    }`;

content = content.replace(validationRegex, validationReplacement);

// 2. Add full error logging to catch block
const catchRegex = /catch \(error\) \{[\s\S]+?console\.error\(\`\[PAYMENT\] Order creation failed - User: \${req\.user\.userId}, Error: \${error\.message}\`\);/;
const catchReplacement = `catch (error) {
      // Log full error details for diagnostics
      console.error('[PAYMENT] Order creation failed details:', {
        userId: req.user.userId,
        errorMessage: error.message,
        errorStack: error.stack,
        errorRaw: error
      });`;

content = content.replace(catchRegex, catchReplacement);

fs.writeFileSync(filePath, content);
console.log('Successfully updated payment.js');
