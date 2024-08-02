const express = require('express');
const router = express.Router();
let login  = require("../controllers/LoginController")
// Mock login route
router.post('/chatLogin', login.loginUser);

module.exports = router;
