
// handler.js
const {
    createLambdaFunction,
    createProbot,
    Probot,
  } = require("@probot/adapter-aws-lambda-serverless");
const appFn = require("../app");
const spawn = require('child_process').execSync
const AWS = require('aws-sdk');
const awsSecretManager = new AWS.SecretsManager({ region: 'us-east-1' });
var go = false;

;(async () => {
  var params = {
    SecretId: "APP_ID"
   };
   let o;
   awsSecretManager.getSecretValue(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     {
      o = data;
    }         // successful response
  });
  console.log(o);
})()


async function getSecrets(){
  
}


function decryptVariables(){
  //getSecrets();

  const child = spawn('node decrypt.js');
  var string = child.toString('ascii');
  var env_v = JSON.parse(string);
  process.env['APP_ID']=env_v.APP_ID;
  process.env['PRIVATE_KEY']=env_v.PRIVATE_KEY;
  process.env['WEBHOOK_SECRET']=env_v.WEBHOOK_SECRET;
  var probot = createProbot();
  return probot;
}

module.exports.webhooks = createLambdaFunction(appFn, { 
      probot : decryptVariables(),
  });


