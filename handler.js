
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

//Handler of the function 
module.exports.webhooks = async (event) => {
    let client = new AWS.SecretsManager();
    let data = JSON.parse((await client.getSecretValue({SecretId: 'dev/mlh-test'}).promise()).SecretString);
    process.env['APP_ID'] = data["APP_ID"];
    process.env['PRIVATE_KEY'] = "\"".concat(data["PRIVATE_KEY"]).concat("\"");
    process.env['WEBHOOK_SECRET'] = data["WEBHOOK_SECRET"];
    return processEvent(event);
}