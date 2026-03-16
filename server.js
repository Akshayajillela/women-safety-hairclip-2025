const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/send-location', async (req, res) => {
    const { latitude, longitude } = req.body;

    const mapLink = `https://maps.google.com/?q=${latitude},${longitude}`;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'akashayareddy05@gmail.com',
            pass: 'yhpweobxwmpulvwb'  // remove spaces
        }
    });

    let mailOptions = {
        from: 'akashayareddy05@gmail.com',
        to: '',  // you can change receiver email here
        subject: '🚨 WOMEN SAFETY EMERGENCY ALERT',
        text: `Emergency! Please help.\n\nLocation:\n${mapLink}`
    };

    try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.send("Emergency Email Sent Successfully!");
} catch (error) {
    console.error("Email Error:", error);
    res.status(500).send("Error sending email");
}
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});