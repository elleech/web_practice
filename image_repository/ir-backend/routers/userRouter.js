const router = require('express').Router();
const Account = require('../models/accountModel');
const User = require('../models/userModel');

// authorization
const auth = require('../middleware/auth');

// create
router.post('/', auth, async (req, res) => {
    try {
        let { firstname, lastname, payment, phone, address } = req.body;

        // get token-stored account id from auth
        const _tokenAccountId = req.accountId;

        // one user per account
        const user = await User.findOne({ _accountId: _tokenAccountId }).exec();
        if (user) {
            return res.status(400).json({ success: false, detail: 'User exists. Please update instead.' });
        }

        // validation
        if (!firstname || !lastname || phone === undefined || phone === null || !address) {
            return res.status(400).json({ success: false, detail: 'Please enter all required fields.' });
        }
        if (phone.toString().length < 10 || !Number.isInteger(phone)) {
            return res.status(400).json({ success: false, detail: 'Please enter a valid phone number.' });
        }
        if (payment === undefined || payment === null) {
            payment = 0;
        } else {
            if (payment.toString().length > 1 || payment > 2 || !Number.isInteger(payment)) {
                return res.status(400).json({ success: false, detail: 'Payment should be 0 or 1.' });
            }
        }

        // save new user
        const newUser = new User({ _accountId: _tokenAccountId, firstname: firstname, lastname: lastname, payment: payment, phone: phone, address: address });
        const savedUser = await newUser.save();

        // return success message
        res.status(200).json({ success: true, detail: savedUser });
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
});

// read all
router.get('/', auth, async (req, res) => {
    try {
        // get token-stored account id from auth
        const _tokenAccountId = req.accountId;
        const tokenAccount = await Account.findById(_tokenAccountId).exec();

        // validation
        if (!tokenAccount.isAdmin) {
            return res.status(400).json({ success: false, detail: 'Cannot access.' });
        }

        // get & return all users
        User.find().then((users) => {
            if (!users.length) {
                return res.status(400).json({ success: false, detail: 'No user in database.' });
            }
            res.status(200).json({ success: true, detail: users });
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

        // get & return user
        User.findOne({ _accountId: account._id }).then((user) => {
            if (!user) {
                return res.status(400).json({ success: false, detail: 'No user in database. Please create instead.' });
            }
            res.status(200).json({ success: true, detail: user });
        });
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
});

// update
router.put('/:accountId', auth, async (req, res) => {
    try {
        let { newFirstname, newLastname, newPayment, newPhone, newAddress } = req.body;
        
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
            return res.status(400).json({ success: false, detail: 'Username does not exist.' });
        }
        
        // get user from request
        const user = await User.findOne({ _accountId: account._id }).exec();
        if (!user) {
            return res.status(400).json({ success: false, detail: 'No user in database. Please create instead.' });
        }
        
        if (!newFirstname) {
            newFirstname = user.firstname;
        }
        if (!newLastname) {
            newLastname = user.lastname;
        }
        if (newPayment === undefined || newPayment === null) {
            newPayment = user.payment;
        } else if (newPayment.toString().length > 1 || newPayment > 2 || !Number.isInteger(newPayment)) {
            return res.status(400).json({ success: false, detail: 'Payment should be 0 or 1.' });
        }
        if (newPhone == undefined || newPhone === null) {
            newPhone = user.phone;
        } else if (newPhone.toString().length < 10 || !Number.isInteger(newPhone)) {
            return res.status(400).json({ success: false, detail: 'Please enter a valid phone number.' });
        }
        if (!newAddress) {
            newAddress = user.address;
        }

        // update & return user
        const newUserInfo = { _accountId: account._id, firstname: newFirstname, lastname: newLastname, payment: newPayment, phone: newPhone, address: newAddress };
        User.findOneAndUpdate({ _accountId: account._id }, newUserInfo, { new: true }).then((user) => {
            res.status(200).json({ success: true, detail: user });
        });
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
});

module.exports = router;