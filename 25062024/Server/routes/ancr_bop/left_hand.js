const express = require('express');
const router = express.Router();
const dbDataFunction = require("../../controllers/ancr_bop/left_hand");
router.get("/", dbDataFunction.findAll);
router.get("/:id", dbDataFunction.findbyid);
router.delete("/:id", dbDataFunction.delData);
router.post("/:id", dbDataFunction.updateData);
router.post("/", dbDataFunction.addData);
module.exports = router;