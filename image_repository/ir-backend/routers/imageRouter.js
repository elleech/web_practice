const router = require('express').Router();
const Account = require('../models/accountModel');
const Image = require('../models/imageModel');

// authorization
const auth = require('../middleware/auth');

// create
router.post('/', auth, async (req, res) => {
    try {
        let { title, imageUrl, date, price } = req.body;

        // get token-stored account id from auth
        const _tokenAccountId = req.accountId;

        // validation
        if (!title || !imageUrl || price === undefined || price === null) {
            return res.status(400).json({ success: false, detail: 'Please enter all required fields.' });
        }
        if (!date) {
            date = Date.now();
        } else {
            date = new Date(date);
        }

        // save new image
        const newImage = new Image({ _ownerAccountId: _tokenAccountId, title: title, imageUrl: imageUrl, date: date, price: price, stock: true });
        const savedImage = await newImage.save();

        // return success message
        res.status(200).json({ success: true, detail: savedImage });
    } catch (err) {
        res.status(500).json({ success: false, detail: err});
    }
});

// read all
router.get('/', (req, res) => {
    try {
        // get & return all images
        Image.find().then((images) => {
            if (!images.length) {
                return res.status(400).json({ success: false, detail: 'No image in repository.' });
            }
            res.status(200).json({ success: true, detail: images });
        });
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
});

// read all by owner account id
router.get('/owner/:accountId', auth, async (req, res) => {
    try {
        // get account id from request
        const _accountId = req.params.accountId;
        const account = await Account.findById(_accountId).exec();

        // validation
        if (!account) {
            return res.status(400).json({ success: false, detail: 'Account ID does not exist.' });
        }

        // get & return all images
        Image.find({ _ownerAccountId: account._id }).then((images) => {
            if (!images.length) {
                return res.status(400).json({ success: false, detail: 'No image with this account ID.' });
            }
            res.status(200).json({ success: true, detail: images });
        });
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
});

// read one
router.get('/:imageId', auth, (req, res) => {
    try {
        // get image id from request
        const _imageId = req.params.imageId;

        // get & return image
        Image.findById(_imageId).then((image) => {
            if (!image) {
                return res.status(400).json({ success: false, detail: 'ImageId does not exist.' });
            }
            res.status(200).json({ success: true, detail: image });
        });
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
});

// update
router.put('/:imageId', auth, async (req, res) => {
    try {
        let { newTitle, newImageUrl, newDate, newPrice, newStock } = req.body;

        // get token-stored account id from auth
        const _tokenAccountId = req.accountId;
        const tokenAccount = await Account.findById(_tokenAccountId).exec();

        // get image id from request
        const _imageId = req.params.imageId;
        const image = await Image.findById(_imageId).exec();

        // validation
        if (!tokenAccount.isAdmin) {
            if (!image) {
                return res.status(400).json({ success: false, detail: 'Cannot access.' });
            }
            if (_tokenAccountId != image._ownerAccountId) {
                return res.status(400).json({ success: false, detail: 'Cannot access.' });
            }
        }

        if (!image) {
            return res.status(400).json({ success: false, detail: 'ImageId does not exist.' });
        }

        if (!newTitle) {
            newTitle = image.title;
        }
        if (!newImageUrl) {
            newImageUrl = image.imageUrl;
        }
        if (!newDate) {
            newDate = image.date;
        } else {
            newDate = new Date(newDate);
        }
        if (newPrice === undefined || newPrice === null) {
            newPrice = image.price;
        }
        if (newStock === undefined || newStock === null) {
            newStock = image.stock;
        }

        // update & return image
        const newImageInfo = { _ownerAccountId: image._ownerAccountId, title: newTitle, imageUrl: newImageUrl, date: newDate, price: newPrice, stock: newStock };
        Image.findByIdAndUpdate(_imageId, newImageInfo, { new: true }).then((image) => {
            res.status(200).json({ success: true, detail: image });
        });
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
});

// delete
router.delete('/:imageId', auth, async (req, res) => {
    try {
        // get token-stored account id from auth
        const _tokenAccountId = req.accountId;
        const account = await Account.findById(_tokenAccountId).exec();

        // get image id from request
        const _imageId = req.params.imageId;
        const image = await Image.findById(_imageId).exec();

        // validation
        if (!account.isAdmin) {
            return res.status(400).json({ success: false, detail: 'Cannot access.' });
        }

        if (!image) {
            return res.status(400).json({ success: false, detail: 'ImageId does not exist.' });
        }

        Image.findByIdAndDelete(_imageId).then(() => {
            res.status(200).json({ success: true, detail: _imageId + ' has been deleted.' });
        });
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
});

// search
router.get('/search/q', auth, async (req, res) => {
    try {
        // get query items from request
        const { username, title, date, dateBefore, dateAfter, price, priceBelow, priceAbove, stock } = req.query;
        const account = await Account.findOne({ username: username }).exec();

        // validation
        if (!account) {
            res.status(400).json({ success: false, detail: 'Username dose not exist.'});
        }

        let query = [];
        if (username) {
            query.push({ _ownerAccountId: account._id });
        }
        if (title) {
            query.push({ title: title });
        }
        if (date) {
            query.push({ date: date });
        }
        if (price) {
            query.push({ price: price });
        }
        if (stock) {
            query.push({ stock: stock });
        }

        // get & return all images
        Image.find().and(query).then((images) => {
            if (!images.length) {
                return res.status(400).json({ success: false, detail: 'Cannot find any image.'});
            }
            res.status(200).json({ success: true, detail: images });
        });
    } catch (err) {
        res.status(500).json({ success: false, detail: err });
    }
});

module.exports = router;