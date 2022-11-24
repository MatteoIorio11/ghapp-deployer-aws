const { createProbot } = require("@probot/adapter-aws-lambda-serverless");
const appFn = require("./app");
const lambda_function = require('./function');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

// Create the probot and put inside it the app. The app is the "filter" on what we have to do when the function is triggered
function processEvent(event) {
    let probot = createProbot();
    probot.load(appFn);
    return lambda_function(probot, event);
}

// Handler of the function 
module.exports.webhooks = async (event) => {
    let client = new AWS.SecretsManager();
    // Get the secrets and parse them as JSON 
    let data = JSON.parse((await client.getSecretValue({ SecretId: process.env['SECRET_ID'] }).promise()).SecretString);
    // Assign the value of the secrets to the env in order to create the Probot app
    process.env['APP_ID'] = data["APP_ID"];
    // TIP : the PRIVATE_KEY must be : ("---BEGIN-RSA--- ....") and not (---BEGIN-RSA--- ....) the ' " " ' are a MUST. 
    let prv_key = data["PRIVATE_KEY"];
    if (prv_key.indexOf('"') === -1) {
        process.env['PRIVATE_KEY'] = "\"".concat(prv_key).concat("\"");
    } else {
        process.env['PRIVATE_KEY'] = prv_key;
    }
    process.env['WEBHOOK_SECRET'] = data["WEBHOOK_SECRET"];
    return processEvent(event);
}   
