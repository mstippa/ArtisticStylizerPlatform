var User = require('../model/user');
var Profile = require('../model/profile');
var PythonShell = require('python-shell');
var spawn = require('child_process').spawn;

var responses = [];

exports.post = function(req, res){

	// when we receive data req.on will be called as our event handler
	req.on("data", function(data) {
	    // turn the request into a string which is the path of the content image

	    var dataString = String(data);

	    var dataArray = dataString.split(" ");
	    console.log(dataArray)

	    //if the first element in our input is an integer, we have a response back 
	    if(dataArray[0] % 1 === 0){
	    	display(dataArray);
	    }
	    // our first element was a file instead, so lets go ahead and add
	    // it to our queue
	    else{
			var content = dataString.substr(0, dataString.indexOf(" "));
			var style = dataString.substr(dataString.indexOf(" ") + 1, dataString.length-1);

		    console.log(content);
		    console.log(style);
		    Profile.getProfile(req.user.userid, function(err, result){
		    	var profile = result;
		    	var options = {
					pythonPath: '/usr/bin/python3',
		   			args: [ 'public/'+content, 
		   					'public'+style,
		   					'public/tmp', 
		   					256, 
		   					512, 
		   					profile.profileid, 
		   					"test",
		   					"test"]
				};
	        	try{
	                PythonShell.run('./scripts/addToQueue.py', options, function(err){
	                	if (err) throw err;
	                	responses[profile.profileid] = res; 
	                	// let the ajax request know we're finished adding to queue
	                	//display(profile.profileid+ " " + "added to queue");
	                });
	        	}
	        	catch(err){
	                console.log(err);
	        	}
		    }); // end get profile
		} // end add to queue block
	}); // end request.on block
}; // end post

	// helper function to send information back to our ajax request
function display(data) {
	console.log("SENDING BACK TO AJAX")
	console.log("RESPONSES STORED: ", responses);
	res = responses[data[0]]
	//remove the ajax response from the responses array
	responses.splice(data[0], 1);

	//send the ajax request
	res.send(data[0] + " " + data[1]);
	console.log(responses);
}







