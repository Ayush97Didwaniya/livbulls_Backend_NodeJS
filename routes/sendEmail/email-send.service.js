const nodemailer = require('nodemailer');
const config = require('config.json');

module.exports = {
    sendEmailFn
};

async function sendEmailFn(data) {
    console.log(data);
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.emailUser,
            pass: config.emailPassword
        }
    });
    
    let mailDetails = {
        from:  config.emailUser,
        to: config.sendEmailTo,
        subject: 'Livbulls Query',
        html: `<p>Query: ${data.message}</p><br><br>
            <p>Name: ${data.name}</p>
            <p>Phone Number: ${data.phoneNumber}</p>
            <p>Email Id: ${data.emailId}</p>
            `
    };

    return await mailTransporter.sendMail(mailDetails);
}


