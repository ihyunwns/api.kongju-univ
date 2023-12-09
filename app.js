const express = require('express')
const app = express()
const path = require('path')
const routes = require('./routes');
const port = 3001;
const cors = require('cors');

app.use(cors());
app.use('/', routes);

app.listen(port, () => {
    console.log(port + '포트 실행중')
})