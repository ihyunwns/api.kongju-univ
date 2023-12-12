const express = require('express');
const router = express.Router();

const upload = require('./upload');
const getURL = require('./getURL');
 
 
router.get('/', function(req, res) {
    res.send('knu api server');
});

router.use('/upload', upload);
router.use('/getURL', getURL);
 
module.exports = router;