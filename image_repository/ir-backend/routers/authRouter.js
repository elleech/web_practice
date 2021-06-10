const router = require('express').Router();
const Account = require('../models/accountModel');

// packages for password encryption
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// authorization
const auth = require('../middleware/auth');

// regex
const emailReg = /(^[a-zA-Z][\w\-\.]*[a-zA-Z0-9]+)\@([a-zA-Z0-9][\w\-\.]*[a-zA-Z0-9]+)\.([a-zA-Z0-9]{2,})([\.]+([a-zA-Z]{2,}))*$/;
const usernameReg = /^[a-zA-Z][\w\-\.\@]*$/;

// register
router.post('/register', async (req, res) => {
    try {
        const { email, username, password, passwordVerify, isAdmin } = req.body;

        // validation
        if (!email || !username || !password || !passwordVerify) {
            return res.status(400).json({ success: false, detail: 'Please enter all required fields.' });
        }
        if (email.length < 8 || !emailReg.test(email)) {
            return res.status(400).json({ success: false, detail: 'Please enter a valid email.' });
        }
        if (username.length < 3 || !usernameReg.test(username)) {
            return res.status(400).json({ success: false, detail: 'Username should be at lease 3 characters.' });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, detail: 'Password should be at lease 6 characters.' });
        }
        if (password != passwordVerify) {
            return res.status(400).json({ success: false, detail: 'Password need to be the same.' });
        }

        const existingEmail = await Account.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ success: false, detail: 'This email has been registered.' });
        }

        const existingUsername = await Account.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).json({ success: false, detail: 'This username has been registered.' });
        }

        // hash password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // save new account
        const newAccount = new Account({ email: email, username: username, passwordHash: passwordHash, isAdmin: isAdmin });
        const savedAccount = await newAccount.save();

        // sign token
        const token = jwt.sign({ accountId: savedAccount._id }, process.env.JWT_SECRET);
        // send token to HTTP-only cookie
        res.cookie('token', token, { httpOnly: true });
        // return register message
        res.status(200).json({ success: true, detail: savedAccount });
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // validation
        if (!username || !password) {
            return res.status(400).json({ success: false, detail: 'Please enter all required fields.' });
        }

        const existingAccount = await Account.findOne({ username: username });
        if (!existingAccount) {
            return res.status(400).json({ success: false, detail: 'Wrong username or password.' });
        }

        const passwordCorrect = await bcrypt.compare(password, existingAccount.passwordHash);
        if (!passwordCorrect) {
            return res.status(400).json({ success: false, detail: 'Wrong username or password.' });
        }

        // sign token
        const token = jwt.sign({ accountId: existingAccount._id }, process.env.JWT_SECRET);
        // send token to HTTP-only cookie
        res.cookie('token', token, { httpOnly: true });
        // return login message
        res.status(200).json({ success: true, detail: 'Welcome, ' + username + '!' });
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
});

// logout
router.get('/logout', auth, async (req, res) => {
    try {
        // get token-stored account id from auth
        const _tokenAccountId = req.accountId;
        const tokenAccount = await Account.findById(_tokenAccountId).exec();

        // erase cookie
        res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
        // return logout message
        res.status(200).json({ success: true, detail: 'Goodbye, ' + tokenAccount.username + '!' });
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
})

// check if logged in (for frontend use)
router.get('/auth', async (req, res) => {
    try {
        // get token
        const token = req.cookies.token;
        if (!token) {
            return res.send({ isLoggedIn: false, isAdmin: false, accountId: null });
        }

        // get account id from verified token
        const tokenVerify = jwt.verify(token, process.env.JWT_SECRET);
        const account = await Account.findById(tokenVerify.accountId).exec();

        // return
        res.send({ isLoggedIn: true, isAdmin: account.isAdmin, accountId: account._id });
    } catch (err) {
        res.send({ isLoggedIn: false, isAdmin: false, accountId: null });
    }
});

module.exports = router;