const express = require("express");
const request = require('request');
const API_PORT = 8080;
// The email to access the API. ADD HERE
const email = "";
// The API token to access the API. ADD HERE
const APItoken = "";
const emailAPI = email + "/token:" + APItoken;
const encodedString = btoa(emailAPI);

// Used for making a GET request
const options = {
  'method': 'GET',
  'url': 'https://zccvnp7514.zendesk.com/api/v2/tickets.json?page[size]=25',
  'headers': {
    'Authorization': 'Basic ' + encodedString
  }
};



const app = express();

// Fetch the tickets for the first time.
app.get("/gettickets", (req, res) => {
    request(options, function (error, response) {
        if (error) {
            throw new Error(error);
        } else {
            res.send(response.body);
        }
      });
});
 
// Used to know which url to fetch from for the next page or the previous page
app.get('/get/:url', (req, res) => {
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