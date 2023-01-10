require('dotenv').config()

const AWS = require('aws-sdk');
const { StatusCodes } = require('http-status-codes');

const cloudFront = new AWS.CloudFront.Signer(
    process.env.KEY_PAIR_ID,
    process.env.PRIVATE_KEY
)


const policy = JSON.stringify({
    Statement: [
        {
            Resource: 'https://cloudfront.nghiadang-cloud.link/*', // http* => http and https
            Condition: {
                DateLessThan: {
                    'AWS:EpochTime':
                        Math.floor(new Date().getTime() / 1000) + 60 * 60 * 1,
                },
            },
        },
    ],
});

const cookie = cloudFront.getSignedCookie({

    policy,
});


const sendCookies = async (req, res) => {


    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Origin", [
        "https://dev.nghiadang-cloud.link:3000",
        "https://cloudfront.nghiadang-cloud.link"
    ])
    // res.header("Access-Control-Max-Age", "2000")
    // res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding")
    res.header("Access-Control-Allow-Methods", ["GET", "POST", "DELETE", 'OPTIONS', "*"]);
    res.header("Access-Control-Expose-Headers", ["Date", "x-api-id"]);
    res.header("Access-Control-Max-Age", "300");
    res.header("Access-Control-Allow-Headers", ["Authorization", "*"]);

    res.cookie('CloudFront-Key-Pair-Id', cookie['CloudFront-Key-Pair-Id'], {
        domain: 'nghiadang-cloud.link',
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    });

    res.cookie('CloudFront-Policy', cookie['CloudFront-Policy'], {
        domain: 'nghiadang-cloud.link',
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    });

    res.cookie('CloudFront-Signature', cookie['CloudFront-Signature'], {
        domain: 'nghiadang-cloud.link',
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    });

    res.status(StatusCodes.OK).json({ key: cookie });

}
module.exports = {sendCookies}