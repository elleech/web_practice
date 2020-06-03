const router = require("express").Router();

// load data model
let Salesperson = require("../models/salespersonModel");

// get - retrieve all
router.get("/", (req, res) => {
  Salesperson.find()
    .then((salespeople) => res.json(salespeople))
    .catch((err) => res.status(400).json("Error in GET salespeople: " + err));
});

// get - retrieve one
router.get("/:saleUsername", (req, res) => {
  Salesperson.findOne({ username: req.params.saleUsername })
    .then((salesperson) => res.json(salesperson))
    .catch((err) =>
      res.status(400).json("Error in GET salesperson by id: " + err)
    );
});

// post - create new
router.post("/", (req, res) => {
  Salesperson.create(req.body)
    .then((salesperson) => {
      res.json(salesperson);
    })
    .catch((err) => res.status(400).json("Error in POST salesperson: " + err));
});

// put - update one
router.put("/:saleUsername", (req, res) => {
  Salesperson.findOneAndUpdate({ username: req.params.saleUsername }, req.body)
    .then(() => res.json("salesperson updated"))
    .catch((err) =>
      res.status(400).json("Error in PUT salesperson by id: " + err)
    );
});

// delete - delete one
router.delete("/:saleUsername", (req, res) => {
  Salesperson.findOneAndDelete({ username: req.params.saleUsername })
    .then(() => res.json("salesperson deleted"))
    .catch((err) =>
      res.status(400).json("Error in DELETE salesperson by id: " + err)
    );
});

module.exports = router;
