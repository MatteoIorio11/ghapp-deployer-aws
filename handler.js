// handler.js
const {
  createLambdaFunction,
  createProbot,
} = require("@probot/adapter-aws-lambda-serverless");
const appFn = require("./app");

module.exports.webhooks =  async (event, context, callback) =>{
  createLambdaFunction(appFn, {
  probot: createProbot(),});
}