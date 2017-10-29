
exports.build = function(row,col,endrow){
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
              '<li><a href="create-account" class="sign-up"><span></span>Sign Up</a><li>',
            	'<li><a href="about"><span></span>About</a></li>',
          	'</ul>',
        	'</div>',
      	'</div>',
    	'</nav>',

      '<div class="container login-container">',
        '<form action="">',
          '<div class="row">',
            '<div class="col-md-6 col-md-offset-3">',
              '<div class="form-group">',
                '<input class="form-control" id="input_username" type="text" placeholder="username">',
              '</div>',
            '</div>',
          '</div>',
          '<div class="row">',
            '<div class="col-md-6 col-md-offset-3">',
              '<div class="form-group">',
                '<input class="form-control" id="input_password" type="text" placeholder="password">',
              '</div>',
            '</div>',
          '</div>',
          '<div class="row">',
            '<div class="col-md-6 col-md-offset-3">',
              '<button type="submit" class="btn btn-primary btn-lg btn-block button id="login-button">Login</button>',
            '</div>',
          '</div>',
        '</form>',
        '#{row}',
        '#{col}',
        '#{endrow}',
      '</div>',

      '<div class="footer-container">',
            '<a class="footer-content" href="ebinizerlop@gmail.com">Email Us</a>',
            '<span class ="footer-content" >&copy; Copyright 1738. No Rights Reserved</span>',
      '</div>',

    '</body>']

  .join('')

};
