const AWS = require("aws-sdk");
const logIndicator = `-----------`;
// const recSqsURL = "https://sqs.ap-southeast-2.amazonaws.com/245866473499/AW_RECEIVE_Q";

const sourceEmail = "info@asyncworking.com";

exports.handler = async (event) => {
    AWS.config.update({ region: "ap-southeast-2" });
    const { email, userName, verificationLink } = event.Records[0].body;
    console.log('EMAIL IS: ', email,', UserName is: ',userName,' ,link is: ',verificationLink);

    // Create sendEmail params
    const sesParams = {
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `<!DOCTYPE html>\r\n    <html>\r\n      <head>\r\n        <title>Demo Title<\/title>\r\n      <\/head>\r\n      <body>\r\n        <p>Hi ${userName},<\/p >\r\n        <p>Please click the link below to verify ${email}.<\/p >\r\n        <a href= ${verificationLink}>Click here!<\/a >\r\n      <\/body>\r\n    <\/html>`,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Thanks for registering with AsyncWorking!',
            },
        },
        Source: sourceEmail,
    };

    const ses = new AWS.SES({ apiVersion: '2010-12-01', endpoint: 'http://localhost:9001' });

    const sesPromise = ses.sendEmail(sesParams).promise();

    return sesPromise.then(
        function(data)  { console.log(`\n${logIndicator} LambdaSendingEmail: Verification Email has been sent!`); },
        function(error) { console.log(`\n${logIndicator} LambdaSendingEmail: SQS Error: ${error}`);}
    );

};