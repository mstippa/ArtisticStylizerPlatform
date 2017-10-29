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
      '<script type="text/javascript" src="/javascript/home-grid.js"></script>',
			'<script type="text/javascript" src="/javascript/open-image.js"></script>',
      '<script type="text/javascript" src="/javascript/helper.js"></script>',
      '<link rel="stylesheet" type="text/css" href="/css/style.css">',
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
          	'<a class="navbar-brand" href="home">ASP</a>',
        	'</div>',
        	'<div class="collapse navbar-collapse" id="myNavbar">',
          	'<ul class="nav navbar-nav navbar-right">',
            	'<li><a href="about"><span class="=about"></span>About</a></li>',
    					'<li class="dropdown">',
    	          '<a class="dropdown-toggle profile" data-toggle="dropdown" href="#"><img id="profilePic" src="/images/pip.PNG" width="50px" height="50px"><span class="caret"></span></a>',
    	          '<ul class="dropdown-menu">',
    	            '<li><a href="profile">Profile</a></li>',
    	            '<li><a href="#">Logout</a></li>',
    	          '</ul>',
    	        '</li>',
          	'</ul>',
        	'</div>',
      	'</div>',
    	'</nav>',

        '<div class="row">',
              '<div class="col-md-8 col-md-offset-2">',
          		'<h1 style="color:#FA7470" id="explore-title">Explore</h1>',
              '<h2>Search for Profiles</h2>',
                  '<div id="custom-search-input">',
                      '<div class="input-group col-md-12">',
                          '<input type="text" class="form-control input-lg" placeholder="Search by Username" />',
                          '<span class="input-group-btn">',
                              '<button class="btn btn-info btn-lg" type="button">',
                                  '<i class="glyphicon glyphicon-search"></i>',
                              '</button>',
                          '</span>',
                      '</div>',
                  '</div>',
              '</div>',
      	'</div>',

        '<div class="explore-content">',
      	  '<div class="grid">',
      	    '<div class="grid-sizer"></div>',
      	    '<div class="grid-item">',
      	      '<a href="#" class="pop"><img src="/images/dinah.jpg"></a>',
      	    '</div>',
      	    '<div class="grid-item">',
      	      '<a href="#" class="pop"><img src="/images/rowing.jpg"></a>',
      	    '</div>',
      	    '<div class="grid-item">',
      	      '<a href="#" class="pop"><img src="/images/rowing2.jpg"></a>',
      	    '</div>',
      	    '<div class="grid-item">',
      	      '<a href="#" class="pop"><img src="/images/dog.jpg"></a>',
      	    '</div>',
      	    '<div class="grid-item">',
      	      '<a href="#" class="pop"><img src="/images/cape.jpg"></a>',
      	    '</div>',
      	    '<div class="grid-item">',
      	      '<a href="#" class="pop"><img src="/images/pip.png"></a>',
      	    '</div>',
      	    '<div class="grid-item">',
      	      '<a href="#" class="pop"><img src="/images/snow.jpg"></a>',
      	    '</div>',
      	    '<div class="grid-item">',
      	      '<a href="#" class="pop"><img src="/images/compound.png"></a>',
      	    '</div>',
      	    '<div class="grid-item">',
      	      '<a href="#" class="pop"><img src="/images/food.jpg"></a>',
      	    '</div>',
      	  '</div>',
        '</div>',

					'<div class="modal fade" id="imagemodal" role="dialog">',
		    		'<div class="modal-dialog">',
		      		'<!-- Modal content-->',
		      		'<div class="modal-content">',
		        		'<div class="modal-header">',
		          		'<button type="button" class="close" data-dismiss="modal">&times;</button>',
		        		'</div>',
		        		'<div class="modal-body">',
		          		'<img id="imagepreview" src="" style="width:100%;"/>',
		        		'</div>',
		        		'<div class="modal-footer">',
									'<button type="button" class="btn btn-primary modal-button"><a href="account.html" style="color:white;">Go to Profile</a></button>',
		          		'<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
		        		'</div>',
		      		'</div>',
		    		'</div>',
		  		'</div>',
		    '</div>',


      '<div class="footer-container">',
            '<a class="footer-content" mailto="ebinizerlop@gmail.com">Email Us</a>',
            '<span class ="footer-content" >&copy; Copyright 1738. No Rights Reserved</span>',
      '</div>',

    '</body>']
    .join('')

};
