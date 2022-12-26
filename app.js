// Mail Chimp List ID
listId = "9ab12ddad4";
// Mail Chimp Api Key
apiKey = "26546fd5150df27a46474147124cf8cb-us21";
// Port
port = process.env.PORT || 3000;
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { dirname } = require("path");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);

  const url = `https://us21.api.mailchimp.com/3.0/lists/${listId}`;
  const options = {
    method: "POST",
    auth: `dracu:${apiKey}`,
  };
  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("failure", (req, res)=>{
  res.redirect("/")
})

app.listen(port, () => {
  console.log("server started at port 3000");
});
