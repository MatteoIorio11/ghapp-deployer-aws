
const { Probot } = require('probot');
const handler = require('./app');


module.exports.webhooks = async (event) => {
  console.log(event);
  let probot = new Probot({
      appId: process.env.APP_ID,
      privateKey: Buffer.from(process.env.PRIVATE_KEY, 'base64').toString('utf-8'),//"-----BEGIN RSA PRIVATE KEY----- MIIEowIBAAKCAQEAx2eOkJLJDmEp+M5kCNpriPhBXZoSF8rJvKOI+WnBqdUsWNs5 m+3ChM0AbpXDtTgWW42cpy/K0KKKeVwP9lrE2cujv/DxyoH7+nIXAAj/0PLFzsuJ y+lf543kyxH9PIABJWAyWYzsmdpUHbGUye86FoRzdFAeIoWxUNvXjUqFDNDowhXO CD6I0Jg1EzthSzJ7eKHFoe4D9x+LJYrw2/z4bZRqAX7v5vWxVa+k8yfXrYNKq00i YHgt00MnzqTwusbcalvFXTkK8Vkl1OkcQGDsrDnCqgOfIfg4i9K2YhcJAs2Dw8J/ k8fy6DbYLtbqfZGNqMNQebJgYuWCKyHktwbR4wIDAQABAoIBAQCf20IsXrB2KajX QMZrXocU8EievFRC5Jxj8QpvQLwz5aS+u0js22e0xQ/Sl5ekoQkzbkymrya9qYCv mAFn8w6at6lXx9ZfDWOvPGV57rz+ipHPndajNT1gSZ2gupQ0Oz4v83WJ2vMWyDPk 9icc1/7ObHKOTWhLLrie5Q9hwtr1ENzpBvmrLCWhFWpjnH2GfgThbCUAH/iKj9nb ScvHRkPMIIFWL0YculPX03svP/SAEbddKPQtqMGYWIbtYfbfGMRUl7wuEp4/qVau vhhsPWPOsUH0snT98K0swW0LDdiN7ztKY0ojW3tRStuVzgnjTZExWpFyPJrUGUuA Oo11Q2cZAoGBAPzfZgZP7bzD9eZHeF84EB+YBVabI7rhKkPhuLBjE4ebs3dCFi30 1OFtgxgb7maNBE6tNN8mvmO7TFSUvxKZstKuVaCsKXDrDsmeUH+44iYvFvOSh6Ob 2ZSGNu7xblc8kaeUo64Zcf2zHITn8//CnqnYAN/A9bom+0xR4Vm6bu4dAoGBAMne 4HkmKKwjRFLG1g8nHmzHNxFKpA/SGwxrD9JCYLsKs36gR76WrrfV7zWVgyBKdmHU c8XP8UqpKAvmRAEoZ0xmM/2OXAa/7/tqFK+PVgpZRMcA5J9bd4GPnIVK5uZKv9Kl OopnRXEARghpV5jUl0X+R769/8ELW+7oBUeEYL//AoGAd304wJLUS/ZtI7tx7cyY EdXL7/ivEYeEaT8n/nFSsSmpzBi2UlD2pu8QmzvXky3fcy31Zdzw6j9++hivkSJ/ lX47iAjSLEFmY28jqra6ZkCqH76FyZHDZqNlIdODyEUerolWLtZnPvJ773GLordc MfWXtCOB+cyhwpaOXc/yyyECgYBADctWRahkLnCQf20Os8/wnim3/+Ic7wMMJrCH e+5rixK3XC5HqFJaHLThYMaRqW70zc/KdZfPo+sEE5WCdIqKcGeQzeofbim8scVM i4O2luq+5maktgYugx4cIU8wxYkmUq1Hm0sqdvbB1oMoCFTTrcKgIHOVkoAiR1bd gYCdiwKBgFtMLWYqobcifYrQroLve+Eyk5/rnDJDdEtTUjmW+9krZJ/doHhuiZzy JOauE+ewVfpj6rqVpGOlr1I37JJBEKP3PJXgoPpN4vySt1FtZagQMchbtZOdKxOQ CkHtiS8z/3/11dZ101Dco4XwTV6Z60ImJjIQ606a0l+OXY2sHvkR -----END RSA PRIVATE KEY-----",
      secret: process.env.WEBHOOK_SECRET
  });
  probot.load(handler);
  
  return probot.webhooks.verifyAndReceive({
        id: event.headers['x-github-delivery'],
        name: event.headers['x-github-event'],
        signature: event.headers['x-hub-signature'],
        payload: JSON.parse(event.body)
    });
};
