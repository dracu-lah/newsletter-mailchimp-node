const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",(req, res)=>{

    firstName=req.body.fName
    lastName=req.body.lName
    email=req.body.email
})

app.listen(3000, () => {
  console.log("server started at port 3000");
});
