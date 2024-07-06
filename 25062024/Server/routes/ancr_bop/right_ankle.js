const express = require('express');
const router = express.Router();
const dbDataFunction = require("../../controllers/ancr_bop/right_ankle");
router.get("/", dbDataFunction.findAll);
router.get("/:id", dbDataFunction.findbyid);
router.delete("/:id", dbDataFunction.delData);
router.put("/:id", dbDataFunction.updateData);
router.post("/", dbDataFunction.addData);
module.exports = router;