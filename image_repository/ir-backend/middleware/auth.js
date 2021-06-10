const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try {
        // get token
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, detail: 'Unauthorized' });
        }

        // verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // pass value of account id
        req.accountId = verified.accountId;
        // return
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ success: false, detail: 'Unauthorized' });
    }
}

module.exports = auth;