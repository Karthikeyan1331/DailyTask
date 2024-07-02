const dbDataFunction = require('../controllers/doctor')
let router = require("express").Router();
router.get("/", dbDataFunction.get);
router.get("/:id", dbDataFunction.getById);
router.delete("/:id", dbDataFunction.removedata);
router.put("/:id", dbDataFunction.updatedata);
router.put("/delete/:id", dbDataFunction.softDeleteData);
router.post("/", dbDataFunction.adddata);
module.exports = router