const AWS = require("aws-sdk");
const recSqsURL = "https://sqs.ap-southeast-2.amazonaws.com/570799447044/receive_queue";
const bktParams = {
    Bucket: 'email-template-bkt',
    Key: 'email_template.txt'
};
const sourceEmail = "can774899203@gmail.com";

exports.handler = async (event) => {
    AWS.config.update({ region: "ap-southeast-2" });
    const { email, userName, verificationLink } = JSON.parse(event.Records[0].body);
    console.log('EMAIL IS: ', email,', UserName is: ',userName,' ,link is: ',verificationLink);
    const s3 = new AWS.S3();
    const template = await s3.getObject(bktParams).promise();
    const htmlStr = template.Body.toString();
    console.log('htmlStr: ',htmlStr);

    // Create sendEmail params
    const sesParams = {
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: eval(`\`${htmlStr}\``),
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Thanks for registering with AsyncWorking!',
            },
        },
        Source: sourceEmail,
    };

    //
    const sqsParams = {
        MessageBody: email,
        QueueUrl: recSqsURL
    };

    const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
    const ses = new AWS.SES({ apiVersion: '2010-12-01' });

    const sesPromise = ses.sendEmail(sesParams).promise();

    const sqsPromise = sesPromise.then(()=>{
        return new Promise((resolve,reject)=>{
            sqs.sendMessage(sqsParams,(err, data)=>{
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log("Success", data.MessageId);
                    resolve("success");
                }
            });
        });
    },reason=>{
        throw reason;
    });

    return sqsPromise;

};