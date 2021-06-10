const router = require('express').Router();
const Account = require('../models/accountModel');
const Image = require('../models/imageModel');
const Buy = require('../models/buyModel');

// authorization
const auth = require('../middleware/auth');

// create
router.post('/', auth, async (req, res) => {
    try {
        const { _imageId } = req.body;

        // get token-stored account id from auth
        const _tokenAccountId = req.accountId;

        // validation
        if (!_imageId) {
            return res.status(400).json({ success: false, detail: 'Please enter all required fields.' });
        }

        // get image from request
        const image = await Image.findById(_imageId).exec();
        if (!image) {
            return res.status(400).json({ success: false, detail: 'ImageId does not exist.' });
        }
        if (!image.stock) {
            return res.status(400).json({ success: false, detail: 'Out of stock.' });
        }

        // save new buy
        const newBuy = new Buy({ _imageId: image._id, _buyerAccountId: _tokenAccountId, cancellation: false, transaction: Date.now(), completion: null });
        const savedBuy = await newBuy.save();

        // update image stock & return buy
        const newImageInfo = { _ownerAccountId: image._ownerAccountId, title: image.title, imageUrl: image.imageUrl, date: image.date, price: image.price, stock: false, tags: image.tags };
        Image.findByIdAndUpdate(image._id, newImageInfo).then(() => {
            res.status(200).json({ success: true, detail: savedBuy });
        });
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

        // get & return all buys
        Buy.find().then((buys) => {
            if (!buys.length) {
                return res.status(400).json({ success: false, detail: 'No deal in database.' });
            }
            res.status(200).json({ success: true, detail: buys });
        });
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
});

// read all by buyer account id
router.get('/buyer/:accountId', auth, async (req, res) => {
    try {
        // get account id from request
        const _accountId = req.params.accountId;
        const account = await Account.findById(_accountId).exec();

        // validation
        if (!account) {
            return res.status(400).json({ success: false, detail: 'Account ID does not exist.' });
        }

        // get & return all buys
        Buy.find({ _buyerAccountId: account._id }).then((buys) => {
            if (!buys.length) {
                return res.status(400).json({ success: false, detail: 'No buy with this account ID.' });
            }
            res.status(200).json({ success: true, detail: buys });
        });
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
});

// read one
router.get('/:buyId', auth, async (req, res) => {
    try {
        // get token-stored account id from auth
        const _tokenAccountId = req.accountId;
        const tokenAccount = await Account.findById(_tokenAccountId).exec();

        // get buy from request
        const _buyId = req.params.buyId;
        const buy = await Buy.findById(_buyId).exec();
        const image = await Image.findById(buy._imageId).exec();

        // validation
        if (!tokenAccount.isAdmin) {
            if (!buy) {
                return res.status(400).json({ success: false, detail: 'Cannot access.' });
            }
            if (_tokenAccountId != buy._buyerAccountId && _tokenAccountId != image._ownerAccountId) {
                return res.status(400).json({ success: false, detail: 'Cannot access.' });
            }
        }

        if (!buy) {
            return res.status(400).json({ success: false, detail: 'BuyId does not exist.' });
        }

        // return buy
        res.status(200).json({ success: true, detail: buy });
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
});

// read one by image id
router.get('/image/:imageId', auth, async (req, res) => {
    try {
        // get token-stored account id from auth
        const _tokenAccountId = req.accountId;
        const tokenAccount = await Account.findById(_tokenAccountId).exec();

        // get buy from request
        const _imageId = req.params.imageId;
        const buy = await Buy.findOne({ _imageId: _imageId }).exec();
        const image = await Image.findById(_imageId).exec();

        // validation
        if (!tokenAccount.isAdmin) {
            if (!buy) {
                return res.status(400).json({ success: false, detail: 'Cannot access.' });
            }
            if (_tokenAccountId != buy._buyerAccountId && _tokenAccountId != image._ownerAccountId) {
                return res.status(400).json({ success: false, detail: 'Cannot access.' });
            }
        }

        if (!buy) {
            return res.status(400).json({ success: false, detail: 'ImageId does not exist.' });
        }

        // return buy
        res.status(200).json({ success: true, detail: buy });
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
});

// update
router.put('/:buyId', auth, async (req, res) => {
    try {
        let { cancellation, completion } = req.body;

        // get token-stored account id from auth
        const _tokenAccountId = req.accountId;
        const tokenAccount = await Account.findById(_tokenAccountId).exec();

        // get buy from request
        const _buyId = req.params.buyId;
        const buy = await Buy.findById(_buyId).exec();
        const image = await Image.findById(buy._imageId).exec();

        // validation
        if (!tokenAccount.isAdmin) {
            if (!buy) {
                return res.status(400).json({ success: false, detail: 'Cannot access.' });
            }
            if (_tokenAccountId != buy._buyerAccountId && _tokenAccountId != image._ownerAccountId) {
                return res.status(400).json({ success: false, detail: 'Cannot access.' });
            }
        }

        if (!buy) {
            return res.status(400).json({ success: false, detail: 'BuyId does not exist.' });
        }

        if (cancellation === undefined || cancellation === null) {
            cancellation = buy.cancellation;
        }
        if (!completion) {
            if (buy.completion) {
                completion = buy.completion;
            }
        } else if (!completion instanceof Date || isNaN(completion)) {
            return res.status(400).json({ success: false, detail: 'Please enter a valid date.' });
        }

        // update & return buy
        const newBuyInfo = { _imageId: buy._imageId, _buyerAccountId: buy._buyerAccountId, cancellation: cancellation, transaction: buy.transaction, completion: completion };
        Buy.findByIdAndUpdate(buy._id, newBuyInfo, { new: true }).then((buy) => {
            if (cancellation == true) {
                const newImageInfo = { _ownerAccountId: image._ownerAccountId, title: image.title, imageUrl: image.imageUrl, date: image.date, price: image.price, stock: true, tags: image.tags };
                Image.findByIdAndUpdate(buy._imageId, newImageInfo).then(() => {
                    res.status(200).json({ success: true, detail: buy });
                });
            }
            res.status(200).json({ success: true, detail: buy });
        });
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
});

module.exports = router;