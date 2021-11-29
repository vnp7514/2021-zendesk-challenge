const express = require("express");
const request = require('request');
const API_PORT = 8080;
const email = "vnp7514@rit.edu";
const APItoken = "fZJsrbGLyz1Pu2b2mLEEAwjrNfRUP6AZ5qgcoqUp";
const emailAPI = email + "/token:" + APItoken;
const encodedString = btoa(emailAPI);

const options = {
  'method': 'GET',
  'url': 'https://zccvnp7514.zendesk.com/api/v2/tickets.json',
  'headers': {
    'Authorization': 'Basic ' + encodedString
  }
};



const app = express();

app.get("/gettickets", (req, res) => {
    console.log("Connected to React");
    request(options, function (error, response) {
        if (error) {
            throw new Error(error);
        } else {
            res.send(response.body);
        }
      });
 });
  
const PORT = process.env.PORT || API_PORT;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));