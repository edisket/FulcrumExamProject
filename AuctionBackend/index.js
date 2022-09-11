const express = require('express');
const app = express();
const router = require('./router/router');
const cors = require('cors');
const orm = require('./services/orm');
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
}


orm();
app.use(cors(corsOptions));
app.use(express.json());

app.use('/', router)

app.listen('8080', () => {

    console.log('API listen to 8080')
})