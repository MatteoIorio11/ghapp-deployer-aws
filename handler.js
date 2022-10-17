
const { Probot } = require('probot');
const handler = require('./app');

const appFn = require("./app");

module.exports.webhooks = createLambdaFunction(appFn, {
  probot: createProbot(),
});