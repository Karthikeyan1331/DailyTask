const dbDataFunction = require('../controllers/dev')
let router2 = require("express").Router();

router2.delete("/dbdel", dbDataFunction.delAllDbData);
router2.delete("/:id", dbDataFunction.delAllDbDataByPatientId);

module.exports = router2