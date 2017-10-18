/*************************************************************
	ASP DATABASE TEST DATA FILE
	
	Purpose:
		-Used to source test data into database


	Author:			Anthony Soricelli
	Last edit:		10/8/2017

*************************************************************/

-- use asp database so we can do things with it
use asp_database;

/**************************************
*		INSERTING TEST DATA 		  *
**************************************/

-- subscription table test data
INSERT INTO subscriptions (description, type)
	VALUES ("free user subscription", "Free");
INSERT INTO subscriptions (description, type)
	VALUES ("premium user subscription", "Premium");

-- user table test data
INSERT INTO users (username, password, email_address, dob, fname, lname, subscription_id)
	VALUES ("asoricelli", "pass", "Soricellia@gmail.com", "1992-05-07", "anthony", "soricelli", 2);
INSERT INTO users (username, password, email_address, dob, fname, lname)
	VALUES ("morganBB", "passw0rd", "morgan@gmail.com", "1994-01-28", "morgan", "badBoy");
INSERT INTO users (username, password, email_address, dob, fname, lname, subscription_id)
	VALUES ("mikeBDB", "boss", "mike@gmail.com", "2000-12-31", "mike", "bigDickBandit", 2);
INSERT INTO users (username, password, email_address, dob, fname, lname)
	VALUES ("ericFTP", "ezpz", "eric@gmail.com", "1000-01-01", "eric", "baller");

-- admins table test data
INSERT INTO admins (user_id)
	VALUES(1);
INSERT INTO admins (user_id)
	VALUES(2);
INSERT INTO admins (user_id)
	VALUES(3);
INSERT INTO admins (user_id)
	VALUES(4);

-- payments table test data
INSERT INTO payments (payment_name, card_type, card_number, address, city, state, zip)
	VALUES("tony's visacard",   "visa",       "1234 5678 9123 4567", "49 skyview dr",     "poughkeepsie", "NY", "12603");
INSERT INTO payments (payment_name, card_type, card_number, address, city, state, zip)
	VALUES("tony's mastercard", "mastercard", "1235 5678 9123 4566", "113 s hamilton st", "poughkeepsie", "NY", "12601");
INSERT INTO payments (payment_name, card_type, card_number, address, city, state, zip)
	VALUES("mikes card",        "mastercard", "1232 5678 9123 4566", "mikes st",          "poughkeepsie", "NY", "12603");

-- user_payments table test data
INSERT INTO user_payments (payment_id, user_id)
	VALUES(1,1);
INSERT INTO user_payments (payment_id, user_id)
	VALUES(2,1);
INSERT INTO user_payments (payment_id, user_id)
	VALUES(3,1);

-- transactions table test data
INSERT INTO transactions (user_id, payment_id, amount)
	VALUES(1, 1, 9.99);
INSERT INTO transactions (user_id, payment_id, amount)
	VALUES(3, 3, 9.99);

-- styles table test data
INSERT INTO styles (style_path)
	VALUES ("/etc/ArtisticStylizerPlatform/webServer/www/assets/default_styles/style1.png");

-- premium_styles table test data
INSERT INTO premium_styles (style_path)
	VALUES ("/etc/ArtisticStylizerPlatform/webServer/www/userData/premium_styles/premiumStyle1.png");

-- profile table test data
INSERT INTO profiles (user_id)
	VALUES (1);
INSERT INTO profiles (user_id)
	VALUES (2);
INSERT INTO profiles (user_id)
	VALUES (3);
INSERT INTO profiles (user_id)
	VALUES (4);

-- profile_styles table test data
INSERT INTO profile_styles 
	VALUES (1, 1);
INSERT INTO profile_styles
	VALUES (3, 1);

-- pictures table test data
INSERT INTO pictures (profile_id, picture_path)
	VALUES (1, "/etc/ArtisticStylizerPlatform/webServer/www/userData/userPictures/img1.png");
INSERT INTO pictures (profile_id, picture_path)
	VALUES (1, "/etc/ArtisticStylizerPlatform/webServer/www/userData/userPictures/img2.png");
INSERT INTO pictures (profile_id, picture_path)
	VALUES (1, "/etc/ArtisticStylizerPlatform/webServer/www/userData/userPictures/img56.png");
INSERT INTO pictures (profile_id, picture_path)
	VALUES (2, "/etc/ArtisticStylizerPlatform/webServer/www/userData/userPictures/img3.png");
INSERT INTO pictures (profile_id, picture_path)
	VALUES (2, "/etc/ArtisticStylizerPlatform/webServer/www/userData/userPictures/img4.png");
INSERT INTO pictures (profile_id, picture_path)
	VALUES (3, "/etc/ArtisticStylizerPlatform/webServer/www/userData/userPictures/img5.png");

-- videoes table test data
INSERT INTO videos (profile_id, video_path)
	VALUES (1, "/etc/ArtisticStylizerPlatform/webServer/www/userData/userVideoes/vid1.mp3");
INSERT INTO videos (profile_id, video_path)
	VALUES (2, "/etc/ArtisticStylizerPlatform/webServer/www/userData/userVideoes/vid2.mp3");
INSERT INTO videos (profile_id, video_path)
	VALUES (3, "/etc/ArtisticStylizerPlatform/webServer/www/userData/userVideoes/vid3.mp3");
INSERT INTO videos (profile_id, video_path)
	VALUES (3, "/etc/ArtisticStylizerPlatform/webServer/www/userData/userVideoes/vid4.mp3");
INSERT INTO videos (profile_id, video_path)
	VALUES (1, "/etc/ArtisticStylizerPlatform/webServer/www/userData/userVideoes/vid5.mp3");

-- usages table test data
INSERT INTO usages (process_time, content_size, profile_id, style_id, content_path)
	VALUES ("00:00:15", 50, 1, 1, "/etc/ArtisticStylizerPlatform/webServer/www/userData/userPictures/img1.png");
INSERT INTO usages (process_time, content_size, profile_id, premium_style_id, content_path)
	VALUES ("00:01:01", 500, 1, 1, "/etc/ArtisticStylizerPlatform/webServer/www/userData/userPictures/img2.png");
INSERT INTO usages (process_time, content_size, profile_id, style_id, content_path)
	VALUES ("00:00:01", 5, 3, 1, "/etc/ArtisticStylizerPlatform/webServer/www/userData/userPictures/img3.png");