const express = require("express");
const app = express();
const cors = require('cors')
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

require("dotenv").config();

const port = parseInt(process.env.PORT);

app.use(cors());
app.use(cookieParser());
app.use(express.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("./src/controller"));

app.listen(port, ()=>{
    console.log(`http://${process.env.HOST}:${port}`);
});
