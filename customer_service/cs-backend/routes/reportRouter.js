const router = require("express").Router();

// load data model
let Buy = require("../models/buyModel");
let Employee = require("../models/employeeModel");
let Report = require("../models/reportModel");

// get - retrieve all
router.get("/", (req, res) => {
  Report.find()
    .then((reports) => res.json(reports))
    .catch((err) => res.status(400).json("Error in GET reports: " + err));
});

// get - retrieve by search value
router.get("/search", (req, res) => {
  if (req.query.rptId) {
    Report.findById(req.query.rptId)
      .then((report) => res.json(report))
      .catch((err) => res.status(400).json("Error in GET report: " + err));
  }

  if (req.query.buyId) {
    Buy.findById(req.query.buyId)
      .then((buy) => {
        Report.find({ _buyId: buy._id }).then((buyReports) =>
          res.json(buyReports)
        );
      })
      .catch((err) =>
        res.status(400).json("Error in GET reports by buy id: " + err)
      );
  }

  if (req.query.emplUsername) {
    Employee.findOne({ username: req.query.emplUsername })
      .then((employee) => {
        Report.find({ _emplId: employee._id }).then((emplReports) =>
          res.json(emplReports)
        );
      })
      .catch((err) =>
        res
          .status(400)
          .json("Error in GET reports by employee username: " + err)
      );
  }
});

// post - create new
router.post("/", (req, res) => {
  Report.create({
    _buyId: req.body._buyId,
    _emplId: req.body._emplId,
    subject: req.body.subject,
    complaint: req.body.complaint,
    status: req.body.status,
  })
    .then((report) => res.json(report))
    .catch((err) => res.status(400).json("Error in POST report: " + err));
});

// put - update one
router.put("/:rptId", (req, res) => {
  Report.findByIdAndUpdate(req.params.rptId, req.body)
    .then(() => res.json("report updated"))
    .catch((err) => res.status(400).json("Error in PUT report by id: " + err));
});

// delete - delete one
router.delete("/:rptId", (req, res) => {
  Report.findByIdAndDelete(req.params.rptId)
    .then(() => res.json("report deleted"))
    .catch((err) =>
      res.status(400).json("Error in DELETE report by id: " + err)
    );
});

module.exports = router;
