const express = require('express')
const path = require("path")
const bodyParser = require("body-parser");
const app = express()

app.use(express.static(path.join(__dirname,"public")))
app.use(bodyParser.urlencoded({extended: false}))
app.set("view engine","ejs");

const userRoutes = require("./Routes/userRoutes");
const policyRoutes = require("./Routes/policyRoutes");
const policyTypeRoutes= require("./Routes/policyTypeRoute");
const policyProviderRoutes=require("./Routes/policyProviderRoute");

app.use(userRoutes);
app.use(policyRoutes);
app.use(policyTypeRoutes);
app.use(policyProviderRoutes);


app.listen(3000,()=>{
  console.log("server restarted!");
})