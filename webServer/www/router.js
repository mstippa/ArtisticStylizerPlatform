// make our router
var express = require('express');
var router  = express.Router();
var passport = require('passport');

/********************************************************************
* 				MIDDLEWARE SPECIFIC TO THIS ROUTER
*********************************************************************/
// called everytime router is used
router.use(function log(req, res, next) {
	//for now just log the time the route is being issued
	console.log('Router     timeOfRoute: ', Date.now(), 'req: ', req.originalUrl);
	//console.log('res', res);
	//TODO statistics

	//next will call the corrisponding get or post
	next();
});


/************************************************************************
*							INDEX ROUTES
************************************************************************/
router.get('/home', routeToHome, function(req, res){
	require('./controllers/home').get(req, res);
});

router.get('/', routeToHome, function(req, res){
	require('./controllers/home').get(req, res);
});

router.post('/', routeToHome, function(req,res){
	require('./controllers/home').get(req, res);
});


/************************************************************************
*							ABOUT ROUTE
************************************************************************/ 
router.get('/about', function(req, res){
	require('./controllers/about-controller').get(req, res);
});



/************************************************************************
*							SIGNUP ROUTE
************************************************************************/
router.get('/create-account', function(req, res){
	require('./controllers/create-account-controller').get(req, res);
});

router.post('/create-account', passport.authenticate('local-signup',
		{ 
		  successRedirect : '/home', //redirect to the secure profile section
		  failureRedirect : '/create-account', //
		  failureFlash: true // allow flash messages
		})
);

/**
router.post('/create-account', 
	function(req, res, next){
		passport.authenticate('local-signup', function(err, user, info){
			
			// there was an error, throw it
			if(err) return next(err);

			console.log("im here");
			console.log(user);

			//username probably already exists
			if(user) return require('./controllers/about-controller').post(req, res, info);

			// ok no errors lets log in
			req.logIn(user, function(err){
				if(err) return next(err);

				return res.redirect('/profile');
			})
		})
		next();
	},
	
);
**/

/************************************************************************
*							LOGIN ROUTES
************************************************************************/
router.get('/login', function(req, res){
	require('./controllers/login-controller').get(req, res);
});

router.post('/login', passport.authenticate('local-login', 
		{
			successRedirect : '/home',
			failureRedirect : '/login',
			badRequestMessage : 'missing credentials',
			failureFlash    : true
		})
);


/************************************************************************
*							LOGOUT
*
*				logs the user out of their session
*
************************************************************************/
router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
})

/************************************************************************
*							PROFILE ROUTE
*
*				make sure the user is first logged in
*
************************************************************************/
router.get('/profile', isLoggedIn, function(req, res){
	require('./controllers/profile-controller').get(req, res);
});



/************************************************************************
*							ADMIN ROUTE
*
*				make sure the user is logged in and an admin
*
************************************************************************/
router.get('/admin', function(req, res){
	require('./controllers/admin-controller').get(req, res);
});



/************************************************************************
*							EXPLORE ROUTE
*
*				make sure the user is first logged in
*
************************************************************************/
router.get('/explore', function(req, res){
	require('./controllers/explore-controller').get(req, res);
});



/************************************************************************
*							ACCOUNT ROUTE
*
*				make sure the user is first logged in
*
************************************************************************/
router.get('/account', function(req, res){
	require('./controllers/account-controller').get(req, res);
});


//export the router to our application
module.exports = router;

//checks if the user is autheticated
function isLoggedIn(req, res, next){

	//if user is authenticated in the session, carry on
	if (req.isAuthenticated()) 
		return next();

	//if not redirect to home page
	res.redirect('/');
}

function routeToHome(req, res, next){
	//if user is authenticated in the session, carry on
	if (req.isAuthenticated()) 
		return next();

	//if not redirect to home page
	res.redirect('/about');	
}


/************************************************************************
*			IMAGE-UPLOAD-ROUTES
*
*			
*
************************************************************************/
router.post('/upload_photo', function(req, res){
	    require('./controllers/upload-image-controller').post(req, res);
});
