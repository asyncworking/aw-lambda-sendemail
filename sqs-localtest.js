const AWS = require("aws-sdk");
exports.handler = async (event) => {
    AWS.config.update({ 
        region: "ap-southeast-2", 
        // endpoint: 'http://localhost:4566', // delete in prod
        accessKeyId: 'test', // delete in prod
        secretAccessKey: 'test' // delete in prod
    });

    const sqsParams = {
        MessageBody: 'daneezhao@gmail.com',
        QueueUrl: 'http://localhost:4566/000000000000/AWRECEIVEQ', // delete in prod
        // QueueUrl: 'https://sqs.ap-southeast-2.amazonaws.com/251160855904/email_dead'
    };
    const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
        
    const result = sqs.sendMessage(sqsParams).promise()
            .then(
            data => console.log("++++++++++++++Successfully call sqs api", data.MessageId),
            err => console.log("!!!!!!!!!!!SQS Error: ", err))
    return await result;     
};