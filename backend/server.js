const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const cors =require('cors')
const connectDb = require("./config/db");


//routes import


//dotenv conig
dotenv.config();
connectDb();



//rest obejct
const app = express();

//middlewares
app.use(express.json());
app.use(moragan("dev"));
app.use(cors());

//routes

//server Api test
app.get("/", async (req, res) => {
    res.send("server running");
  });
  
  //port
  const PORT = process.env.PORT || 8080;
  //listen port
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`.bgCyan .white);
  });