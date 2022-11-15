
// handler.js
const {
    createProbot,
  } = require("@probot/adapter-aws-lambda-serverless");
const appFn = require("./app");
const lambda_function = require('./function');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

//Create the probot and put inside it the app. The app is the "filter" on what we have to do when the function is triggered
function processEvent(event){
    var probot = createProbot();
    probot.load(appFn);
    return lambda_function(probot, event);
}

function getSecret(secretName) {
    // Load the AWS SDK
    var AWS = require('aws-sdk');
  
    // Create a Secrets Manager client
    var client = new AWS.SecretsManager();
  
    // In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
    // See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    // We rethrow the exception by default.
  
    client.getSecretValue({SecretId: secretName}, function(err, data) {
        if (err) {
            if (err.code === 'DecryptionFailureException')
                // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'InternalServiceErrorException')
                // An error occurred on the server side.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'InvalidParameterException')
                // You provided an invalid value for a parameter.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'InvalidRequestException')
                // You provided a parameter value that is not valid for the current state of the resource.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'ResourceNotFoundException')
                // We can't find the resource that you asked for.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
        }
        else {
            // Decrypts secret using the associated KMS CMK.
            // Depending on whether the secret is a string or binary, one of these fields will be populated.
            if ('SecretString' in data) {
                return data.SecretString;
            } else {
                let buff = new Buffer(data.SecretBinary, 'base64');
                return buff.toString('ascii');
            }
      }
    });
  }
  

//Handler of the function 
module.exports.webhooks = async (event) => {
    var client = new AWS.SecretsManager();
    var data = await client.getSecretValue({SecretId: 'APP_ID'}).promise();
    console.log(data);
    //Assign the decrypted values inside the env 
    //Process the event of our function
    //return processEvent(event);
}