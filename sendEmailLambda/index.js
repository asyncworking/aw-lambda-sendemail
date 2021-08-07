require('dotenv').config();
const AWS = require("aws-sdk");
const sendEmailHelper = require('./sendEmailHelper.js');
const getTemplateHelper= require('./getTemplateHelper.js');

AWS.config.update({ 
    region: process.env.region, 
    endpoint: process.env.endpoint,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.handler = async (event) => {
    const { email, userName, verificationLink } = event.Records[0].body;
    const emailTemplate = await getTemplateHelper.getTemplateFromS3Bucket(AWS);
    sendEmailHelper.sendToEmail( emailTemplate, email, userName, verificationLink, AWS);

    return {
        statusCode: 200,
        body: {
            toAddress: email,
            userName: userName,
            verificationLink: verificationLink
        }
    }
};