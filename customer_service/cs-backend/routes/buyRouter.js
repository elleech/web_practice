const router = require("express").Router();

// load data model
let Customer = require("../models/customerModel");
let Product = require("../models/productModel");
let Salesperson = require("../models/salespersonModel");
let Buy = require("../models/buyModel");

// get - retrieve all
router.get("/", (req, res) => {
  Buy.find()
    .then((buys) => res.json(buys))
    .catch((err) => res.status(400).json("Error in GET buys: " + err));
});

// get - retrieve by search value
router.get("/search", (req, res) => {
  if (req.query.buyId) {
    Buy.findById(req.query.buyId)
      .then((buy) => res.json(buy))
      .catch((err) => res.status(400).json("Error in GET buy: " + err));
  }

  if (req.query.custUsername) {
    Customer.findOne({ username: req.query.custUsername })
      .then((customer) => {
        Buy.find({ _custId: customer._id }).then((custBuys) =>
          res.json(custBuys)
        );
      })
      .catch((err) =>
        res.status(400).json("Error in GET buys by customer username: " + err)
      );
  }

  if (req.query.pdtId) {
    Buy.find({ _pdtId: req.query.pdtId })
      .then((pdtBuys) => res.json(pdtBuys))
      .catch((err) =>
        res.status(400).json("Error in GET buys by product id: " + err)
      );
  }

  if (req.query.saleUsername) {
    Salesperson.findOne({ username: req.query.saleUsername })
      .then((salesperson) => {
        Buy.find({ _saleId: salesperson._id }).then((saleBuys) =>
          res.json(saleBuys)
        );
      })
      .catch((err) =>
        res
          .status(400)
          .json("Error in GET buys by salesperson username: " + err)
      );
  }
});

// post - create new
router.post("/", (req, res) => {
  Buy.create({
    _custId: req.body._custId,
    _pdtId: req.body._pdtId,
    _saleId: req.body._saleId,
    quantity: req.body.quantity,
    orderDate: new Date(req.body.orderDate),
    deliverDate: new Date(req.body.deliverDate),
    // cancel: false,
  })
    .then((buy) => res.json(buy))
    .catch((err) => res.status(400).json("Error in POST buy: " + err));
});

// put - update one
router.put("/:buyId", (req, res) => {
  Buy.findByIdAndUpdate(req.params.buyId, req.body)
    .then(() => res.json("buy updated"))
    .catch((err) => res.status(400).json("Error in PUT buy by id: " + err));
});

// delete - delete one
router.delete("/:buyId", (req, res) => {
  Buy.findByIdAndDelete(req.params.buyId)
    .then(() => res.json("buy deleted"))
    .catch((err) => res.status(400).json("Error in DELETE buy by id: " + err));
});

module.exports = router;
