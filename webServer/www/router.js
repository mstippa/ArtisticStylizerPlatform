
// these are the file system (fs) and url modules that come as part of
// node.js
var url = require('url');
var fs = require('fs');

//this allows our server file (server.js) to use this get(request,response)
//function, passing the request and response objects through
exports.get = function(request, response){
	//getting the path of the URL request
	request.requrl = url.parse(request.url, true);
	var path = request.requrl.pathname;
	path = path.toLowerCase();

	//testing to see whether the request is for a CSS file and loading it in if
	//so.
	if(/.(css)$/.test(path)){
		response.writeHead(200, {
				'Content-Type': 'text/css'
		});
		fs.readFile(__dirname +path, 'utf8', function(err,data){
				if(err) throw err;
				response.write(data, 'utf8');
				response.end();
		});
	}else if(/.(jpg)$/.test(path) || /.(png)$/.test(path)){
                // get the img
		var img = fs.readFileSync(path.substring(1));

		response.writeHead(200, {
                                'Content-Type': 'image/gif'
                });
		response.end(img, 'binary');

        }else if(/.(js)$/.test(path) ){
		response.writeHead(200, {
			'Content-Type': 'text/javascript'
		});
		fs.readFile(__dirname +path, 'utf8', function(err, data){
				if(err) throw err;
				response.write(data,'utf8');
				response.end();
		});
	}else{
		//sending the request to the correct controller if not CSS file
		if(path === '/' || path === '/home'){
			require('./controllers/home').get(request, response);
		} else if (path === '/about') {
			require('./controllers/about-controller').get(request, response);
		} else if (path === '/login') {
				require('./controllers/login-controller').get(request, response);
		}else
			require('./controllers/404').get(request, response);
		}
}
