const AWS = require("aws-sdk");
const logIndicator = `-----------`;
// const recSqsURL = "https://sqs.ap-southeast-2.amazonaws.com/245866473499/AW_RECEIVE_Q";
const recSqsURL = "http://localhost:4566/000000000000/AW_RECEIVE_Q";
const bktParams = {
    Bucket: 'aw-email-template',
    Key: 'email_template.txt'
};
const sourceEmail = "info@asyncworking.com";

exports.handler = async (event) => {
    AWS.config.update({ 
        region: "ap-southeast-2", 
        endpoint: 'http://localhost:4566',
        accessKeyId: 'test',
        secretAccessKey: 'test'
    });
    // const { email, userName, verificationLink } = JSON.parse(event.Records[0].body);
    const { email, userName, verificationLink } = event.Records[0].body;
    console.log('EMAIL IS: ', email,', UserName is: ',userName,' ,link is: ',verificationLink);
    // const s3 = new AWS.S3({ apiVersion: '2006-03-01', endpoint: 'host.docker.internal:4566', sslEnabled: false, s3ForcePathStyle:true});
    // const template = await s3.getObject(bktParams).promise();
    // const htmlStr = template.Body.toString();
    // console.log('htmlStr: ',htmlStr);

    // Create sendEmail params
    // const sesParams = {
    //     Destination: {
    //         ToAddresses: [email],
    //     },
    //     Message: {
    //         Body: {
    //             Html: {
    //                 Charset: 'UTF-8',
    //                 Data: eval(`\`${htmlStr}\``),
    //             },
    //             Text: {
    //                 Data: eval(`\`${htmlStr}\``)
    //             }
    //         },
    //         Subject: {
    //             Charset: 'UTF-8',
    //             Data: 'Thanks for registering with AsyncWorking!',
    //         },
    //     },
    //     Source: sourceEmail,
    // };

    // const sqsParams = {
    //     MessageBody: email,
    //     QueueUrl: 'http://localhost:4566/000000000000/AWRECEIVEQ'
    // };

    // const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
    // const ses = new AWS.SES({ apiVersion: '2010-12-01', endpoint: 'http://localhost:9001' });

    // const sesPromise = ses.sendEmail(sesParams).promise().then(
    //     function(data)  { console.log(`\n${logIndicator} sendEmail: Succeed`); },
    //     function(error) { console.log(`\n${logIndicator} sendEmail: Failed ${error}`);}
    // );

    // await sqs.sendMessage(sqsParams).promise()
    //     .then(data => console.log("++++++++++++++Successfully call sqs api", data.MessageId))
    //     .catch(err => console.log("!!!!!!!!!!!SQS Error: ", err));
    // const sqsPromise = sesPromise.then(()=>{
    //     return new Promise((resolve,reject)=>{
    //         sqs.sendMessage(sqsParams,(err, data)=>{
    //             if (err) {
    //                 console.log(err+"==================== SQS send errr");
    //                 reject(err+"==================== SQS rejected");
    //             } else {
    //                 console.log("Success", data.MessageId);
    //                 resolve("Success: SQS message has been sent!");
    //             }
    //         });
    //     });
    // },reason=>{
    //     throw reason;
    // });

    // .then(
    //     function(data)  { console.log(`\n${logIndicator} LambdaSendingEmail: Verification Email has been sent!`); },
    //     function(error) { console.log(`\n${logIndicator} LambdaSendingEmail: SQS Error: ${error}`);}
    // );
    // const sqsParams = {
    //     MessageBody: email,
    //     QueueUrl: "http://localhost:4566/000000000000/AWRECEIVEQ"
    // };
    // const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
    // const result = sqs.sendMessage(sqsParams).promise()
    // .then(
    //     data => console.log("++++++++++++++Successfully call sqs api", data.MessageId),
    //     err => console.log("!!!!!!!!!!!SQS Error: ", err))
    // return await result;  
    const sqsParams = {
        MessageBody: email,
        QueueUrl: 'http://localhost:4566/000000000000/AWRECEIVEQ'
    };
    const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
        
    const result = sqs.sendMessage(sqsParams).promise()
            .then(
            data => console.log("++++++++++++++Successfully call sqs api", data.MessageId),
            err => console.log("!!!!!!!!!!!SQS Error: ", err))
    return result;     
};