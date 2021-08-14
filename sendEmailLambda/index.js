require('dotenv').config();
const AWS = require("aws-sdk");
const sendEmailHelper = require('./sendEmailHelper.js');
const getTemplateHelper= require('./getTemplateHelper.js');

AWS.config.update({ 
    region: process.env.region
});

exports.handler = async (event) => {
    const { email, userName, verificationLink } = event.Records[0].body;
    const emailTemplate = await getTemplateHelper.getTemplateFromS3Bucket(AWS);
    await sendEmailHelper.sendToEmail( emailTemplate, email, userName, verificationLink, AWS);

    return {
        statusCode: 200,
        body: {
            toAddress: email,
            userName: userName,
            verificationLink: verificationLink
        }
    }
};