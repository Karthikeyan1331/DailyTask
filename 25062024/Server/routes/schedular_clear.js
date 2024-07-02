const dbDataFunction = require('../controllers/schedular_clear')
let router1 = require("express").Router();

router1.delete("/", dbDataFunction.delAllErrData);
router1.delete("/del", dbDataFunction.delAllData);

module.exports = router1