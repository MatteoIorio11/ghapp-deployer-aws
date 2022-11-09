
// handler.js
const {
    createLambdaFunction,
    createProbot,
    Probot,
  } = require("@probot/adapter-aws-lambda-serverless");
const appFn = require("./app");
const spawn = require('child_process').execSync
const fun = require('./function');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const functionName = process.env.AWS_LAMBDA_FUNCTION_NAME;

const encrypted_app_id = process.env['APP_ID'];
const encrypted_webhook_secret = process.env['WEBHOOK_SECRET'];
const encrypted_private_key = process.env['PRIVATE_KEY'];


let decrypted= {};

function processEvent(event){
  var probot = createProbot();
  probot.load(appFn);
  return fun(probot, event);
}


module.exports.webhooks = async (event) => {
  if( !decrypted.APP_ID || !decrypted.PRIVATE_KEY || !decrypted.WEBHOOK_SECRET ) {
      const kms = new AWS.KMS();
      const req1 = {
          CiphertextBlob: Buffer.from(encrypted_app_id, 'base64'),
          EncryptionContext: { LambdaFunctionName: functionName },
      };
      const req2 = {
          CiphertextBlob: Buffer.from(encrypted_private_key, 'base64'),
          EncryptionContext: { LambdaFunctionName: functionName },
      };
      const req3 = {
          CiphertextBlob: Buffer.from(encrypted_webhook_secret, 'base64'),
          EncryptionContext: { LambdaFunctionName: functionName },
      };
      try {
          var data_a = await kms.decrypt(req1).promise();
          var data_p = await kms.decrypt(req2).promise();
          var data_w = await kms.decrypt(req3).promise();
          decrypted.APP_ID= data_a.Plaintext.toString('ascii');
          decrypted.PRIVATE_KEY = data_p.Plaintext.toString('ascii');
          decrypted.WEBHOOK_SECRET = data_w.Plaintext.toString('ascii');
      } catch (err) {
          console.log('Decrypt error:', err);
          return {
            statusCode: 500,
            body: `{err : ${err} }`,
          };
      }
  }
  process.env['APP_ID'] = decrypted.APP_ID;
  process.env['PRIVATE_KEY'] = "\"".concat(decrypted.PRIVATE_KEY).concat("\"");
  process.env['WEBHOOK_SECRET'] = decrypted.WEBHOOK_SECRET;
  console.log(decrypted.PRIVATE_KEY);
  /* TESTARE CON <return createProbot(app, probot)> */
  return processEvent(event);
}