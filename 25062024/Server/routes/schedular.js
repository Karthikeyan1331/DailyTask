const dbDataFunction = require('../controllers/schedular')
let router = require("express").Router();

router.get("/", dbDataFunction.findAll);
router.get("/:id", dbDataFunction.findbyid);
router.delete("/:id", dbDataFunction.delData);
router.put("/:id", dbDataFunction.updateData);
router.put("/delete/:id", dbDataFunction.softDeleteData);
router.post("/approve", dbDataFunction.setStatsAndCopyData);
router.post("/", dbDataFunction.addData);
module.exports = router;