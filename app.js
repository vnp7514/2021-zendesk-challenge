const express = require("express");
const request = require('request');
const API_PORT = 8080;
const email = "vnp7514@rit.edu";
const APItoken = "fZJsrbGLyz1Pu2b2mLEEAwjrNfRUP6AZ5qgcoqUp";
const emailAPI = email + "/token:" + APItoken;
const encodedString = btoa(emailAPI);

var next = "";
var previous = "";

const options = {
  'method': 'GET',
  'url': 'https://zccvnp7514.zendesk.com/api/v2/tickets.json?page[size]=25',
  'headers': {
    'Authorization': 'Basic ' + encodedString
  }
};



const app = express();

app.get("/gettickets", (req, res) => {
    request(options, function (error, response) {
        if (error) {
            throw new Error(error);
        } else {
            if (response.body.links) {
                previous = response.body.links.prev;
                next = response.body.links.next; 
            }
            console.log(previous);
            console.log(next);
            res.send(response.body);
        }
      });
 });
 
app.get('/get/:url', (req, res) => {
    console.log(req.params);
    const link = {
        'method': 'GET',
        'url': 'https://zccvnp7514.zendesk.com/api/v2/tickets.json?' + atob(req.params.url),
        'headers': {
            'Authorization': 'Basic ' + encodedString
        }
    };
    request(link, function(error, response){
        if (error) {
            throw new Error(error);
        } else {
            res.send(response.body);
        }
    });
});
  
const PORT = process.env.PORT || API_PORT;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));