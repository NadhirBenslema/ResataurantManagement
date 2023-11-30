const express=require('express');
const http=require('http');
const mongo=require('mongoose');
const bodyParser=require('body-parser');
const plate=require('./model/plate')
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });





const mongoconnection=require('./config/mongoconnection.json')

var path = require("path");

mongo.connect(mongoconnection.url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("DataBase Connected");
      })
      .catch((err) => {
        console.log(err);
    });




var app=express();
app.set("views",path.join(__dirname,"views"));
app.set("view engine","twig");

const plateRouter=require('./routes/plate');

const server=http.createServer(app);


server.listen(5000,()=>console.log("Server is running..."));

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
////////////////////////
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());
app.use(cors());

////////////////////////


app.use('/plates',plateRouter);
app.use('/uploads', express.static('uploads'));

