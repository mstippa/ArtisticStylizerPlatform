/*
The first thing we are doing here is joining an array of strings, placing
a new line �n� between them. This creates one long string of HTML that will
render on separate lines leaving the source code more readable. This string is
the basis of our template, and contains a number of placeholders for the
content items {title}, {pagetitle} and {content}.
*/
exports.build = function(title, pagetitle, content){
	return [

		'<!DOCTYPE HTML>',
		'<html lang="en">',
		'<head>',
			'<title>ASP</title>',
		  '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">',
		  '<link href="https://fonts.googleapis.com/css?family=Libre+Franklin" rel="stylesheet">',
		  '<script type = "text/javascript" src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>',
		  '<script type = "text/javascript" src = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>',
			'<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">',
			'<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>',
		  '<script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.js"></script>',
		  '<script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js"></script>',
		  '<link rel="stylesheet" type="text/css" href="/css/style.css">',
			'<script type="text/javascript" src="/javascript/home-grid.js"></script>',
		'</head>',
		'<body>',
			'<nav class="navbar navbar-inverse">',
		  	'<div class="container-fluid">',
		    	'<div class="navbar-header">',
		      	'<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">',
		        	'<span class="icon-bar"></span>',
		        	'<span class="icon-bar"></span>',
		        	'<span class="icon-bar"></span>',
		      	'</button>',
		      	'<a class="navbar-brand" href="#">ASP</a>',
		    	'</div>',
		    	'<div class="collapse navbar-collapse" id="myNavbar">',
		      	'<ul class="nav navbar-nav navbar-right">',
					'<li><a href="explore"><span class="=explore"></span>Explore</a></li>',
		        	'<li><a href="about"><span class="=about"></span>About</a></li>',
					'<li class="dropdown">',
			          '<a class="dropdown-toggle profile" data-toggle="dropdown" href="#"><img id="profilePic" src="/images/pip.png" width="50px" height="50px"><span class="caret"></span></a>',
			          '<ul class="dropdown-menu">',
			            '<li><a href="profile">Profile</a></li>',
			            '<li><a href="#">Logout</a></li>',
			          '</ul>',
			        '</li>',
		      	'</ul>',
		    	'</div>',
		  	'</div>',
			'</nav>',

		  '<div class="wrapper">',
				'<div class="wrapper-content">',
					'<h1 class="wrapper-copy">Choose a Photo or Video to Style</h1>',
			    '<div id="upload">',
			      '<div class="file-upload" data-toggle="modal" data-target="#myModal">',
			        '<div class="file-select">',
			          '<div class="file-select-button" id="fileName"><i class="material-icons" id="camera_icon">camera_alt</i></div>',
			          '<div class="file-select-name" id="noFile">Choose Photo</div>',
			          '<input type="file" name="chooseFile" id="chooseFile" onchange="readURL(this);"/>',
			        '</div>',
			      '</div>',
						'<div class="file-upload" data-toggle="modal" data-target="#myModal">',
			        '<div class="file-select">',
			          '<div class="file-select-button" id="fileName"><i class="material-icons" id="video_icon">videocam</i></div>',
			          '<div class="file-select-name" id="noFile">Choose Video</div>',
			          '<input type="file" name="chooseFile" id="chooseFile" onchange="readURL(this);">',
			        '</div>',
			      '</div>',
			    '</div>',
					'<!-- Modal -->',
					'<div class="modal fade" id="myModal" role="dialog">',
		    		'<div class="modal-dialog">',
		      		'<!-- Modal content-->',
		      		'<div class="modal-content">',
		        		'<div class="modal-header">',
		          		'<button type="button" class="close" data-dismiss="modal">&times;</button>',
		    					'<div class="styles"></div><div class="styles"></div><div class="styles"></div>',
		        		'</div>',
		        		'<div class="modal-body">',
		          		'<img id="uploaded-image" src="#"/>',
		        		'</div>',
		        		'<div class="modal-footer">',
									'<button type="button" class="btn btn-primary">Save content</button>',
		          		'<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
		        		'</div>',
		      		'</div>',
		    		'</div>',
		  		'</div>',
				'</div>',
		  '</div>',
		  '<div id="image"><img src="/images/blurryback3.jpg" id="image-wrapper"></div>',

			'<div class="content">',
			  '<div class="grid">',
			    '<div class="grid-sizer"></div>',
			    '<div class="grid-item">',
			      '<img src="/images/dinah.jpg" />',
			    '</div>',
			    '<div class="grid-item">',
			      '<img src="/images/rowing.jpg" />',
			    '</div>',
			    '<div class="grid-item">',
			      '<img src="/images/rowing2.jpg" />',
			    '</div>',
			    '<div class="grid-item">',
			      '<img src="/images/dog.jpg" />',
			    '</div>',
			    '<div class="grid-item">',
			      '<img src="/images/cape.jpg" />',
			    '</div>',
			    '<div class="grid-item">',
			      '<img src="/images/pip.png" />',
			    '</div>',
			    '<div class="grid-item">',
			      '<img src="/images/snow.jpg" />',
			    '</div>',
			    '<div class="grid-item">',
			      '<img src="/images/compound.png" />',
			    '</div>',
			    '<div class="grid-item">',
			      '<img src="/images/food.jpg" />',
			    '</div>',
			  '</div>',

				'<div class="footer-container">',
			        '<a class="footer-content" href="ebinizerlop@gmail.com">Email Us</a>',
			        '<span class ="footer-content" >&copy; Copyright 1738. No Rights Reserved</span>',
			  '</div>',
			'</div>',

		'</body>']

.join('')
};
