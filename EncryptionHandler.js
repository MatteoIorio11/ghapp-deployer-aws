
// handler.js
const {
    createLambdaFunction,
    createProbot,
    Probot,
  } = require("@probot/adapter-aws-lambda-serverless");
const appFn = require("./app");
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const functionName = process.env.AWS_LAMBDA_FUNCTION_NAME;
const encrypted_app_id = process.env['APP_ID'];
const encrypted_webhook_secret = process.env['WEBHOOK_SECRET'];
const encrypted_private_key = process.env['PRIVATE_KEY'];
let decrypted_app_id, decrypted_webhook_secret, decrypted_private_key;


function processEvent(event) {
    createLambdaFunction(appFn, {
        probot: new Probot({
            appId: decrypted_app_id,
            privateKey: decrypted_private_key,
            secret: decrypted_webhook_secret,
          }),
      });
}

module.exports.webhooks = async (event) => {
    const kms = new AWS.KMS();
    if (!decrypted_app_id) {
        // Decrypt code should run once and variables stored outside of the
        // function handler so that these are decrypted once per container
        try {
            const req = {
                CiphertextBlob: Buffer.from(encrypted_app_id, 'base64'),
                EncryptionContext: { LambdaFunctionName: functionName },
            };
            const data = await kms.decrypt(req).promise();
            decrypted_app_id = data.Plaintext.toString('ascii');
        } catch (err) {
            console.log('Decrypt error:', err);
            throw err;
        }
    }
    if (!decrypted_private_key) {
        // Decrypt code should run once and variables stored outside of the
        // function handler so that these are decrypted once per container
        try {
            const req = {
                CiphertextBlob: Buffer.from(encrypted_private_key, 'base64'),
                EncryptionContext: { LambdaFunctionName: functionName },
            };
            const data = await kms.decrypt(req).promise();
            decrypted_private_key = data.Plaintext.toString('ascii');
        } catch (err) {
            console.log('Decrypt error:', err);
            throw err;
        }
    }
    if (!decrypted_webhook_secret) {
        // Decrypt code should run once and variables stored outside of the
        // function handler so that these are decrypted once per container
        try {
            const req = {
                CiphertextBlob: Buffer.from(encrypted_webhook_secret, 'base64'),
                EncryptionContext: { LambdaFunctionName: functionName },
            };
            const data = await kms.decrypt(req).promise();
            decrypted_webhook_secret = data.Plaintext.toString('ascii');
        } catch (err) {
            console.log('Decrypt error:', err);
            throw err;
        }
    }
    processEvent(event);
};
