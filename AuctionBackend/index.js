const express = require('express');
const app = express();
const router = require('./router/router');
const cors = require('cors');
const orm = require('./services/orm');
const swaggerUi = require('swagger-ui-express');

const PORT = "8080";

const swaggerOption = {
    swaggerDefinition:{
        info:{
            title:'Auction API',
            description:'These are list of APIs for auction',
            contact:{
                name:"Edison Esguerra"
            },
            servers:[`http://localhost:${PORT}`]
        }
    },
    apis:["./controller/auction.js"]
}

const swaggerDocs =  require('swagger-jsdoc')(swaggerOption)

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
}


orm();
app.use(cors(corsOptions));
app.use(express.json());



app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.use('/', router)

app.listen(PORT, () => {

    console.log(`API listen to ${PORT}`)
})