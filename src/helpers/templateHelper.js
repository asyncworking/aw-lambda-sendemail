require('dotenv').config();

exports.getTemplateFromS3Bucket = async ( templateBucket,
    templateKey, AWS) => {
    const bktParams = {
        Bucket: templateBucket,//'aw-email-template-danni',
        Key: templateKey//'email_template.txt'
    };
    const s3 = new AWS.S3({ apiVersion: '2006-03-01', endpoint: process.env.s3_endpoint, sslEnabled: false, s3ForcePathStyle:true});
    const template = await s3.getObject(bktParams).promise();
    const htmlStr = template.Body.toString();
    return htmlStr;
}