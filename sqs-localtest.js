const AWS = require("aws-sdk");
const config = {
    endpoint: new AWS.Endpoint('http://localhost:4566'),
    accessKeyId: 'test',
    secretAccessKey: 'test',
    region: 'ap-southeast-2'
}
const QUEUE_URL = 'http://localhost:4566/000000000000/AWRECEIVEQ';
const sqs = new AWS.SQS(config);
    
const sqsParams = {
    MessageBody: 'Welcome to QTest',
    QueueUrl: QUEUE_URL, // delete in prod
    // QueueUrl: 'https://sqs.ap-southeast-2.amazonaws.com/251160855904/email_dead'
};

exports.handler = async (event, context) => {
    const promise = new Promise(function(resolve, reject) {
        const result = sqs.sendMessage(sqsParams, function(err, data) {
            if (err) {
                console.log('ERR', err);
                reject(err);
            }
            resolve(data);
            console.log(data);
            // context.succeed('Exit');   
        });
    })
    // return promise;
    SQS.sendMessage(msgParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.MessageId);
        }
    });


//     const result = sqs.sendMessage(sqsParams).promise()
//     .then(
//     data => console.log("++++++++++++++Successfully call sqs api", data.MessageId),
//     err => console.log("!!!!!!!!!!!SQS Error: ", err))
// return await result;  
}
