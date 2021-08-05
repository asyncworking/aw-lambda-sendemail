const AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-2'});

const config = {
    endpoint: new AWS.Endpoint('http://localhost:4566'),
    accessKeyId: 'test',
    secretAccessKey: 'test',
    region: 'ap-southeast-2'
}

const QUEUE_URL = 'http://localhost:4566/000000000000/AWRECEIVEQ';
const SQS = new AWS.SQS(config);

const msgParams = { 
    MessageBody: "Welcome to QTest",
    QueueUrl: QUEUE_URL
    };

SQS.sendMessage(msgParams, function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.MessageId);
    }
});