const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const videoRoutes = require("./routes/videos");
const { PORT } = process.env;


app.use(cors())
app.use(express.json());



  app.use("/videos", videoRoutes);



  app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
});
