require('dotenv').config();

exports.sendToEmail = async (emailTemplate, email, userName, verificationLink, AWS) => {
    const sourceEmail = process.env.sourceEmail //'info@asyncworking.com'

    const sesParams = {
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: eval(`\`${emailTemplate}\``),
                },
                Text: {
                    Data: eval(`\`${emailTemplate}\``)
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Thanks for registering with AsyncWorking!',
            },
        },
        Source: sourceEmail,
    };

    const ses = new AWS.SES({ apiVersion: '2010-12-01', endpoint: process.env.ses_endpoint});
    const sesPromise = ses.sendEmail(sesParams).promise();
    
    const sqsParams = {
        MessageBody: email,
        QueueUrl: process.env.sqsQueueUrl //'https://sqs.ap-southeast-2.amazonaws.com/251160855904/email_dead' 
    };

    const sqs = new AWS.SQS({ apiVersion: '2012-11-05', endpoint: process.env.sqs_endpoint});
    const sqsPromise = sesPromise.then(()=>{
        return new Promise((resolve,reject)=>{
            sqs.sendMessage(sqsParams,(err, data)=>{
                if (err) {
                    // console.log("SQS send error"+err);
                    reject(err);
                } else {
                    // console.log("Success", data.MessageId);
                    resolve("Success: SQS message has been sent!");
                }
            });
        });
    },reason=>{
        throw reason;
    });
    return sqsPromise;
}