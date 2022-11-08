
// handler.js
const {
    createLambdaFunction,
    createProbot,
    Probot,
  } = require("@probot/adapter-aws-lambda-serverless");
const appFn = require("../app");
const spawn = require('child_process').execSync
const AWS = require('aws-sdk');
const kms = new AWS.KMS();
AWS.config.update({ region: 'us-east-1' });

const functionName = process.env.AWS_LAMBDA_FUNCTION_NAME;

const encrypted_app_id = process.env['APP_ID'];
const encrypted_webhook_secret = process.env['WEBHOOK_SECRET'];
const encrypted_private_key = process.env['PRIVATE_KEY'];
var finish = "a";

let decrypted= {};

async function myFunction (){
    if ( decrypted.APP_ID && decrypted.PRIVATE_KEY && decrypted.WEBHOOK_SECRET ) {
        let content = {
            APP_ID: decrypted.APP_ID,
            PRIVATE_KEY: decrypted.PRIVATE_KEY,
            WEBHOOK_SECRET: decrypted.WEBHOOK_SECRET
        };
        var data = JSON.stringify(content);
        console.log(data);
    } else {
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
            let content = {
                APP_ID: decrypted.APP_ID,
                PRIVATE_KEY: decrypted.PRIVATE_KEY,
                WEBHOOK_SECRET: decrypted.WEBHOOK_SECRET
            };
            var data = JSON.stringify(content);
            console.log(data);
        } catch (err) {
            console.log('Decrypt error:', err);
            throw err;
        }
    }
    finish = "b";
}
function decryptVariables(){
    myFunction();
    while(finish === "a"){}
  /*
  const child = spawn('node decrypt.js');
  var string = child.toString('ascii');
  var env_v = JSON.parse(string);
  process.env['APP_ID']=env_v.APP_ID;
  process.env['PRIVATE_KEY']=env_v.PRIVATE_KEY;
  process.env['WEBHOOK_SECRET']=env_v.WEBHOOK_SECRET;
  */
  //while(!go){}
  var probot = createProbot();
  return probot;
}

module.exports.webhooks = createLambdaFunction(appFn, { 
      probot : decryptVariables(),
  });


