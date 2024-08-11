const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const cors =require('cors')
const connectDb = require("./config/db");

//dotenv conig
dotenv.config();
//routes import
const PendulumRouter = require('./routes/pendulumRouter')
const EnergyRouter=require('./routes/energyRouter')
//mongodb connection
connectDb();



//rest obejct
const app = express();

//middlewares
app.use(express.json());
app.use(moragan("dev"));
app.use(cors());

//routes
app.use('/api/v1',PendulumRouter)
app.use('/api/v1/energy',EnergyRouter)

//server Api test
app.get("/run", async (req, res) => {
    res.send("server running");
  });
  
  //port
  const PORT = process.env.PORT || 8080;
  //listen port
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`.bgCyan .white);
  });