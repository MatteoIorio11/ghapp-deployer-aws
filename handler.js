
const { createProbot } = require('probot');
const {createLambdaFunction} = require("./create-lambda");

const appFn = require("./app");

module.exports.webhooks = createLambdaFunction(appFn, {
  probot: createProbot(),
});

/*
// handler.js
const {
  createLambdaFunction,
  createProbot,
} = require("@probot/adapter-aws-lambda-serverless");
const appFn = require("./app");

module.exports.webhooks = createLambdaFunction(appFn, {
  probot: createProbot(),
});
*/
