require('dotenv').config();

exports.getTemplateFromS3Bucket = async (AWS) => {
    const bktParams = {
        Bucket: process.env.s3Bucket,//'aw-email-template-danni',
        Key: process.env.s3Key//'email_template.txt'
    };
    const s3 = new AWS.S3({ apiVersion: '2006-03-01', endpoint: process.env.endpoint, sslEnabled: false, s3ForcePathStyle:true});
    const template = await s3.getObject(bktParams).promise();
    const htmlStr = template.Body.toString();
    return htmlStr;
}