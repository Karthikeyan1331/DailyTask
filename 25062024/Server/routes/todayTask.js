const dbDataFunction = require("../controllers/tasks");

let router = require("express").Router();

// Retrieve all dbDataFunction
router.get("/", dbDataFunction.get);


router.get("/:id", dbDataFunction.getById);

router.post("/", dbDataFunction.adddata);

router.put("/:id", dbDataFunction.updatedata);

router.put("/delete/:id", dbDataFunction.softDeleteData);

router.delete("/:id", dbDataFunction.removedata);


module.exports = router;