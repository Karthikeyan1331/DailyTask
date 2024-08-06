const express = require('express');
const router = express.Router();
let chatjs = require("../controllers/ChatController")
let userInfo = require("../controllers/LoginController")
let upload = require("./fileUpload")
// Mock login route
router.post('/getUsers', chatjs.getUsers);
router.post('/getMessage', chatjs.getMessage);
router.post('/getLastSeen', userInfo.getLastSeen);
router.post("/userSeenMessage", chatjs.messageAllSeen);
router.post('/uploadwithfile', upload.single('image'), chatjs.fileUploadSuccessOrNot)
module.exports = router;
