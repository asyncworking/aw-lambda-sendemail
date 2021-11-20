require('dotenv').config();

exports.sendToEmail = async (companyName, companyOwnerName, emailTemplate, email, userName, verificationLink, templateType, AWS) => {
    const sourceEmail = process.env.sourceEmail; //'info@asyncworking.com'
    let emailSubjectString;
    
    switch(templateType) {
        case "Verification":
            emailSubjectString = "Thanks for registering with AsyncWorking!";
            break;
        case "Invitation":
            emailSubjectString = "You are invited to AsyncWorking!";
            break;
        case "ForgetPassword":
            emailSubjectString = "Reset Password from AsyncWorking!";
            break;
        case "CompanyInvitation":
            emailSubjectString = `You have been invited to join ${companyName} on the AsyncWorking`;
        default:
            emailSubjectString = "Message from AsyncWorking";
    }

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
                Data: emailSubjectString,
            },
        },
        Source: sourceEmail,
    };

    const ses = new AWS.SES({ apiVersion: '2010-12-01', endpoint: process.env.ses_endpoint, region: process.env.region});
    const sesPromise = ses.sendEmail(sesParams).promise();
    
    const sqsParams = {
        MessageBody: '',
        QueueUrl: process.env.sqsQueueUrl //'https://sqs.ap-southeast-2.amazonaws.com/251160855904/email_dead' 
    };
    const sqs = new AWS.SQS({ apiVersion: '2012-11-05', endpoint: process.env.sqs_endpoint, region: process.env.region});

    const sqsPromise = await sesPromise.then( sesResult =>{

        const messageBody = {
            emailType: templateType,
            email: email,
            timeSent: Date.now(),
            sesResultId: sesResult.MessageId
        }
        sqsParams.MessageBody = JSON.stringify(messageBody);
        
        return new Promise((resolve,reject)=>{
            const sqsResult = JSON.parse(sqsParams.MessageBody);
            sqs.sendMessage(sqsParams,(err, data)=>{
                if (err) {
                    reject(err);
                } else {
                    sqsResult.sqsResultId = data.MessageId;
                    resolve(sqsResult);
                }
            });
        });
    },reason=>{
        throw reason;
    });
    return sqsPromise;
}