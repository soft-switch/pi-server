/*** import the required modules ***/

// HTTP module => making HTTP request, response,
//  creating http server...
var http = require('http');

// FileSystem module => reading, writing, watching files
//  (synchronously and asynchronously)
var fs = require('fs');

// Express module => provides more advanced server features
var express = require('express');


/*** Server configuration ***/

// extract sever configuration from json file
var configs = JSON.parse(fs.readFileSync("mServer_config.json"));

var port = configs.port;
var host = configs.host;


/*** Server creation and Setup ***/

// create an express server
var app = express();

// setup host 
app.use(app.router);
app.use(express.static(__dirname));

// this block below handles all the file requests
//  from the clients
app.get('/', function(req, res){

    // read the file with the filename requested by client
    //  asynchronously
   fs.readFile('.'+req.url(),function(error,data){
       
       // if file doesn't exit, respond with error msg and code
        if(error){
            resp.writeHeader("404",{"Content-type":"text/html"});
            resp.end("Error! check url!");

        }else
        {
            // if file is read, display the file!
            resp.write(200);
            resp.end(data);
        }

    });

});

// make the server listen to port
app.listen(port);


// a message
console.log("Listening on port : "+port);



