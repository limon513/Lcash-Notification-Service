const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    GMAILMAIL: process.env.GMAIL_EMAIL,
    GMAILPASS: process.env.GMAIL_PASS,
}