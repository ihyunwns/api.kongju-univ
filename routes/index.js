const express = require('express');
const router = express.Router();

const upload = require('./upload');
 
 
router.get('/', function(req, res) {
    res.send('router1');
});

router.use('/upload', upload);
 
module.exports = router;