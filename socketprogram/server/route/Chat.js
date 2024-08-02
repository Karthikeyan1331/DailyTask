const express = require('express');
const router = express.Router();
let chatjs  = require("../controllers/ChatController")
// Mock login route
router.post('/getUsers', chatjs.getUsers);
router.post('/getMessage', chatjs.getMessage);

module.exports = router;
module.exports = router;
