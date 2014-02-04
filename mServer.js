/*** import the required modules ***/

var exec = require('child_process').exec;

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

	// code to send data serially 
/*	exec('echo 12 >> /dev/ttyUSB0',function(err,stdout,stderr){

	if(err)
		console.log("Error occured while exec cmd");
	else	
			console.log("Std out: "+stdout);

	});
*/


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

// this block below handles all the file uploads
//  from the clients
app.get('/uploads', function(req, res){

    cosole.log("Request received");

    //var newFile = fs.createWriteStream("./uploads/"+req.params.text);
    var newFile = fs.createWriteStream("some-file.txt");

    req.pipe(newFile);

    req.on('end',function(){
        
        res.end("File Uploaded");
        });

});


// make the server listen to port
app.listen(port);


// a message
console.log("Listening on port : "+port);

