const express = require('express');
const router = require('./url_routes');
const ConnectDB = require('./connect');


const app=express();
const PORT=8002;
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


ConnectDB("mongodb://localhost:27017/short-url");
app.use('/url',router);


app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
