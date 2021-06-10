const router = require('express').Router();
const Account = require('../models/accountModel');

// packages for password encryption
const bcrypt = require('bcryptjs');

// authorization
const auth = require('../middleware/auth');

// regex
const emailReg = /(^[a-zA-Z][\w\-\.]*[a-zA-Z0-9]+)\@([a-zA-Z0-9][\w\-\.]*[a-zA-Z0-9]+)\.([a-zA-Z0-9]{2,})([\.]+([a-zA-Z]{2,}))*$/;
const usernameReg = /^[a-zA-Z][\w\-\.\@]*$/;

// read all
router.get('/', auth, async (req, res) => {
    try {
        // get token-stored account id from auth
        const _tokenAccountId = req.accountId;
        const tokenAccount = await Account.findById(_tokenAccountId).exec();

        // validation
        if (!tokenAccount.isAdmin) {
            return res.status(400).json({ success: false, detail: 'Only admin can access.' });
        }

        // get & return all accounts
        Account.find().then((accounts) => {
            res.status(200).json({ success: true, detail: accounts });
        });
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
});

// read one
router.get('/:accountId', auth, async (req, res) => {
    try {
        // get token-stored account id from auth
        const _tokenAccountId = req.accountId;
        const tokenAccount = await Account.findById(_tokenAccountId).exec();

        // get account id from request
        const _accountId = req.params.accountId;
        const account = await Account.findById(_accountId).exec();

        // validation
        if (!tokenAccount.isAdmin) {
            if (!account) {
                return res.status(400).json({ success: false, detail: 'Cannot access.' });
            }
            if (_tokenAccountId != account._id) {
                return res.status(400).json({ success: false, detail: 'Cannot access.' });
            }
        }

        if (!account) {
            return res.status(400).json({ success: false, detail: 'Account ID does not exist.' });
        }

        // get & return account
        res.status(200).json({ success: true, detail: account });
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
});

// update
router.put("/:accountId", auth, async (req, res) => {
    try {
        let { newEmail, newUsername, newPassword, newPasswordVerify, newIsAdmin } = req.body;

        // get token-stored account id from auth
        const _tokenAccountId = req.accountId;
        const tokenAccount = await Account.findById(_tokenAccountId).exec();

        // get account id from request
        const _accountId = req.params.accountId;
        const account = await Account.findById(_accountId).exec();

        // validation
        if (!tokenAccount.isAdmin) {
            if (!account) {
                return res.status(400).json({ success: false, detail: 'Cannot access.' });
            }
            if (_tokenAccountId != account._id) {
                return res.status(400).json({ success: false, detail: 'Cannot access.' });
            }
            if (newIsAdmin) {
                return res.status(400).json({ success: false, detail: 'Unauthorized.' });
            }
        }
        
        if (!account) {
            return res.status(400).json({ success: false, detail: 'Account ID does not exist.' });
        }
        
        if (!newEmail) {
            newEmail = account.email;
        } else if (newEmail && newEmail.toLowerCase() != account.email) {
            const existingEmail = await Account.findOne({ email: newEmail.toLowerCase() }).exec();
            if (existingEmail) {
                return res.status(400).json({ success: false, detail: 'This email has been registered.' });
            }
            if (newEmail.length < 8 || !emailReg.test(newEmail)) {
                return res.status(400).json({ success: false, detail: 'Please enter a valid email.' });
            }
        }
        
        if (!newUsername) {
            newUsername = account.username;
        } else if (newUsername && newUsername != account.username) {
            const existingUsername = await Account.findOne({ username: newUsername }).exec();
            if (existingUsername) {
                return res.status(400).json({ success: false, detail: 'This username has been registered.' });
            }
            if (newUsername.length < 3 || !usernameReg.test(newUsername)) {
                return res.status(400).json({ success: false, detail: 'Username should be at lease 3 characters.' });
            }
        }

        let newPasswordHash = account.passwordHash;
        if (newPassword) {
            if (newPassword.length < 6) {
                return res.status(400).json({ success: false, detail: 'Password should be at lease 6 characters.' });
            }
            if (newPassword != newPasswordVerify) {
                return res.status(400).json({ success: false, detail: 'Password need to be the same.' });
            }
            // hash password
            const salt = await bcrypt.genSalt();
            newPasswordHash = await bcrypt.hash(newPassword, salt);
        }

        if (newIsAdmin === undefined || newIsAdmin === null) {
            newIsAdmin = account.isAdmin;
        }

        // update & return account
        const newAccountInfo = { email: newEmail, username: newUsername, passwordHash: newPasswordHash, isAdmin: newIsAdmin };
        Account.findByIdAndUpdate(account._id, newAccountInfo, { new: true }).then((account) => {
            res.status(200).json({ success: true, detail: account });
        });
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
});

// delete
router.delete("/:accountId", auth, async(req, res) => {
    try {
        // get token-stored account id from auth
        const _tokenAccountId = req.accountId;
        const tokenAccount = await Account.findById(_tokenAccountId).exec();

        // get account id from request
        const _accountId = req.params.accountId;
        const account = await Account.findById(_accountId).exec();

        // validation
        if (!tokenAccount.isAdmin) {
            return res.status(400).json({ success: false, detail: 'Cannot access.' });
        }

        if (!account) {
            return res.status(400).json({ success: false, detail: 'Account ID does not exist.' });
        }

        // delete & return result
        Account.findByIdAndDelete(account._id).then(() => {
            // erase cookie
            if (_tokenAccountId == account._id) {
                res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
            }

            res.status(200).json({ success: true, detail: account._id + ' has been deleted.' });
        });
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
});

module.exports = router;