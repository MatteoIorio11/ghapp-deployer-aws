
// handler.js
const {
    createProbot,
  } = require("@probot/adapter-aws-lambda-serverless");
const appFn = require("./app");
const lambda_function = require('./function');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const functionName = process.env.AWS_LAMBDA_FUNCTION_NAME;

//Take all the crypted env variables
const encrypted_app_id = process.env['APP_ID'];
const encrypted_webhook_secret = process.env['WEBHOOK_SECRET'];
const encrypted_private_key = process.env['PRIVATE_KEY'];

let decrypted= {};

//Create the probot and put inside it the app. The app is the "filter" on what we have to do when the function is triggered
function processEvent(event){
    var probot = createProbot();
    probot.load(appFn);
    return lambda_function(probot, event);
}

//Handler of the function 
module.exports.webhooks = async (event) => {
    //First of all I have to check if the env variables are already decrypted, used for differents layers
    if( !decrypted.APP_ID || !decrypted.PRIVATE_KEY || !decrypted.WEBHOOK_SECRET ) {
        const kms = new AWS.KMS();
        //req1 : APP_ID decryption 
        const req1 = {
            CiphertextBlob: Buffer.from(encrypted_app_id, 'base64'),
            EncryptionContext: { LambdaFunctionName: functionName },
        };
        //req2 : PRIVATE_KEY decryption 
        const req2 = {
            CiphertextBlob: Buffer.from(encrypted_private_key, 'base64'),
            EncryptionContext: { LambdaFunctionName: functionName },
        };
        //req3 : WEBHOOK_SECRET decryption 
        const req3 = {
            CiphertextBlob: Buffer.from(encrypted_webhook_secret, 'base64'),
            EncryptionContext: { LambdaFunctionName: functionName },
        };
        try {
            //DECRYPT the variables inside the env 
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
    //Assign the decrypted values inside the env 
    process.env['APP_ID'] = decrypted.APP_ID;
    process.env['PRIVATE_KEY'] = "\"".concat(decrypted.PRIVATE_KEY).concat("\"");
    process.env['WEBHOOK_SECRET'] = decrypted.WEBHOOK_SECRET;
    //Process the event of our function
    return processEvent(event);
}