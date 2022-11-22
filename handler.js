
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
    //Get the secrets and parse them as JSON 
    let data = JSON.parse((await client.getSecretValue({SecretId: 'dev/mlh-test'}).promise()).SecretString);
    //Assign the value of the secrets to the env in order to create the Probot app
    process.env['APP_ID'] = data["APP_ID"];
    // TIP : the PRIVATE_KEY must be : ("---BEGIN-RSA--- ....") and not (---BEGIN-RSA--- ....) the ' " " ' are a MUST. So if you
    // add the Secret as "---BEGIN...." you have to use ; process.env['PRIVATE_KEY'] = data["PRIVATE_KEY"]; 
    process.env['PRIVATE_KEY'] = "\"".concat(data["PRIVATE_KEY"]).concat("\"");
    process.env['WEBHOOK_SECRET'] = data["WEBHOOK_SECRET"];
    return processEvent(event);
}