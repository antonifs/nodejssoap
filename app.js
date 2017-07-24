//main startung points
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const soap = require('soap');

// app setup
app.use(morgan('combined'));
app.get("/", function(req, res){

    const url = "http://localhost:3030/bmicalculator?wsdl";
    const args = {weight:"70",height:"1.67"};
    soap.createClient(url, function(err, client) {
        client.calculateBMI(args, function(err, result) {
            res.send({ message: JSON.stringify(result) });
        });
    });
});

// server
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
