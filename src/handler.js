// handler.js
const {
  createLambdaFunction,
  createProbot,
} = require("@probot/adapter-aws-lambda-serverless");
const appFn = require("./app");

exports.webhooks = createLambdaFunction(appFn, {
  probot: createProbot(),
});