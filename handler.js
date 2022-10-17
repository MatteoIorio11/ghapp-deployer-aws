// handler.js
const {createProbot} = require("probot");
const {createLambdaFunction } = require("./create-lambda");
const appFn = require("./app");

module.exports.webhooks = createLambdaFunction(appFn, {
  probot: createProbot(),
});