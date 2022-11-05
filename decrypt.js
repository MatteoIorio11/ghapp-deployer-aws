const AWS = require('aws-sdk');
const kms = new AWS.KMS();
AWS.config.update({ region: 'us-east-1' });

const functionName = process.env.AWS_LAMBDA_FUNCTION_NAME;

const encrypted_app_id = process.env['APP_ID'];
const encrypted_webhook_secret = process.env['WEBHOOK_SECRET'];
const encrypted_private_key = process.env['PRIVATE_KEY'];


let decrypted= {};

;(async () => {
    if ( decrypted.APP_ID && decrypted.PRIVATE_KEY && decrypted.WEBHOOK_SECRET ) {
        process.env['APP_ID'] = decrypted.APP_ID;
        process.env['PRIVATE_KEY'] = decrypted.PRIVATE_KEY;
        process.env['WEBHOOK_SECRET'] = decrypted.WEBHOOK_SECRET;
        return decrypted;
    } else {
        const kms = new AWS.KMS();
        const req1 = {
            CiphertextBlob: Buffer.from(encrypted_app_id, 'base64'),
            EncryptionContext: { LambdaFunctionName: functionName },
        };
        const req2 = {
            CiphertextBlob: Buffer.from(encrypted_private_key, 'base64'),
            EncryptionContext: { LambdaFunctionName: functionName },
        };
        const req3 = {
            CiphertextBlob: Buffer.from(encrypted_webhook_secret, 'base64'),
            EncryptionContext: { LambdaFunctionName: functionName },
        };
        try {
            var data_a = await kms.decrypt(req1).promise();
            var data_p = await kms.decrypt(req2).promise();
            var data_w = await kms.decrypt(req3).promise();
            decrypted.APP_ID= data_a.Plaintext.toString('ascii');
            decrypted.PRIVATE_KEY = data_p.Plaintext.toString('ascii');
            decrypted.WEBHOOK_SECRET = data_w.Plaintext.toString('ascii');
            let content = {
                APP_ID: decrypted.APP_ID,
                PRIVATE_KEY: decrypted.PRIVATE_KEY,
                WEBHOOK_SECRET: decrypted.WEBHOOK_SECRET
            };
            var data = JSON.stringify(content);
            console.log(data);
        } catch (err) {
            console.log('Decrypt error:', err);
            throw err;
        }
        
    }
})()