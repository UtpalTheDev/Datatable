const express = require('express');
let bodyparse = require('body-parser');
const mongoose = require('mongoose');
const {Schema} =mongoose;
const cors = require('cors');
const app = express();

app.use(bodyparse.json())
const { errorHandler } = require("./middlewares/error-handler.middleware")
const { routeNotFound } = require("./middlewares/route-not-found.middleware");
const { verifyAuth } = require("./middlewares/verifyAuth.middleware")

app.use(cors())
const login=require("./routes/login.router.js");
const signup=require("./routes/signup.router.js");
const data=require("./routes/dataFetch.router.js");

//mongoose conn
mongoose.connect(process.env.DB_Secret,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{console.log("mongoose connected")}).catch(eror=>{console.log("mongoose connection problem",error)})

app.get("/", (req, res) => {
  res.send("table backend")
})


app.use('/login',login);
app.use('/signup',signup)
app.use('/data',verifyAuth, data)
app.use(routeNotFound);

app.use(errorHandler);

const port=process.env.PORT || 3100
app.listen(port, () => {
  console.log('server started');
});