const AWSMock = require("aws-sdk-mock");
const AWS = require("aws-sdk");
const myHandler = require( '../index.js');
const payload = require('../../end_to_end_test/payload').default;

describe('Lambda Function', () => {

    it("handler should return a StatusCode of 200", async () => {
        const response = await myHandler.handler(payload);
        expect(response.statusCode).toBe(200||202) 
    });
    it("handler should return destination email, username and verification link", async () => {
        const response = await myHandler.handler(payload);
        expect(response.body.toAddress).toEqual("johndoe@test.com");
        expect(response.body.userName).toEqual("John Doe");
    });
});
