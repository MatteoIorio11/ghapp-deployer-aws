const fs = require('fs');


var a = "1";
var b = "2";
var c = "4";
let content = {
    APP_ID: a,
    PRIVATE_KEY: b,
    WEBHOOK_SECRET: c
};
let data = JSON.stringify(content);
console.log(data);