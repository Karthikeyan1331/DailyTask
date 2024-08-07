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
router.get('/sendingFiles/:fileName', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'sendingFiles', req.params.fileName);
    res.setHeader('Content-Disposition', `attachment; filename="${req.params.fileName}"`);
    res.download(filePath, req.params.fileName, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Error downloading file.');
        }
    });
});
router.get('/countMessageNotSeen/:userName',chatjs.countMessageNotSeen)
module.exports = router;
