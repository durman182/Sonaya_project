const bcrypt = require('bcrypt');

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

function checkGDPRCompliance(req, res, next) {
    if (!req.body.gdprConsent) {
        return res.status(400).send('GDPR consent required');
    }
    next();
}

module.exports = { hashPassword, checkGDPRCompliance };