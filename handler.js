// handler.js
const { Probot } = require('probot');
const appFn = require("./app");

module.exports.webhooks = async (event) => {
  let probot = new Probot({
        appId: process.env.APP_ID,
        privateKey: Buffer.from(process.env.PRIVATE_KEY, 'base64').toString('utf-8'),
        secret: process.env.WEBHOOK_SECRET,
        logLevel: process.env.PROBOT_LOG_LEVEL || 'info'
    });
};
