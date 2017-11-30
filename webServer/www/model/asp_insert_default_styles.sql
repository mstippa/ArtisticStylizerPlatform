/*************************************************************
	ASP DATABASE INSERT DEFAULT STYLES
	
	Purpose:
		-Used to source default styles into the database


	Author:			Anthony Soricelli
	Last edit:		11/29/2017

*************************************************************/

-- use asp database so we can do things with it
use asp_database;

/**************************************
*		INSERTING DEAULT STYLES		  *
**************************************/

INSERT INTO styles(style_path)
	VALUES ("/public/default_styles/alien_rainbow.jpg");

INSERT INTO styles(style_path)
	VALUES ("/public/default_styles/brickwall.jpg");

INSERT INTO styles(style_path)
	VALUES ("/public/default_styles/deja_vu.jpg");

INSERT INTO styles(style_path)
	VALUES ("/public/default_styles/divisionism.jpg");

INSERT INTO styles(style_path)
	VALUES ("/public/default_styles/instagael.jpg");

INSERT INTO styles(style_path)
	VALUES ("/public/default_styles/oil_on_canvas.jpg");

INSERT INTO styles(style_path)
	VALUES ("/public/default_styles/van_gogh.jpg");

INSERT INTO styles(style_path)
	VALUES ("/public/default_styles/water_ripple.jpg");
