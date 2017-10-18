/*************************************************************
	ASP DATABASE INITALIZATION FILE
	
	Purpose:
		-Should only be sourced when creating new database from scratch.
		
		-This will drop the old database and create a new one from scratch

		-This file does NOT come with test data, only the table structure and
		 table contraints are implemented here


	Author:			Anthony Soricelli
	Last edit:		10/8/2017

*************************************************************/

/************************************************
*			 create new database 				*
************************************************/


-- drop database and create new one
DROP DATABASE IF EXISTS asp_database;
CREATE DATABASE asp_database;



/************************************************
*			 create our users 					*
************************************************/

-- read only user
DROP USER 'asp_read_only'@'localhost';
CREATE USER 'asp_read_only'@'localhost' IDENTIFIED BY 'readOnly';
GRANT SELECT ON `asp_database`.* TO 'asp_read_only'@'localhost';

-- read/write user
DROP USER 'asp_read_write'@'localhost';
CREATE USER 'asp_read_write'@'localhost' IDENTIFIED BY 'readWrite';
GRANT SELECT, INSERT, DELETE, UPDATE ON `asp_database`.* TO 'asp_read_write'@'localhost';

/***********************************************
*			TABLE STRUCTURES 				   *
***********************************************/

-- use this database to create tables
use asp_database;

-- users table structure
CREATE TABLE IF NOT EXISTS `users` (
	`user_id` 				int(11) 		NOT NULL		AUTO_INCREMENT,
	`username` 				varchar(30) 	NOT NULL 		UNIQUE,
	`email_address` 		varchar(30) 	NOT NULL 		UNIQUE,
	`password` 				varchar(255) 	NOT NULL,
	`dob` 					DATE 			DEFAULT NULL,
	`fname` 				varchar(20),
	`lname` 				varchar(20),
	`subscription_id`		int(11)			DEFAULT 1,
	
	PRIMARY KEY(`user_id`)
);

-- admins table structure
CREATE TABLE IF NOT EXISTS `admins` (
	`admin_id`				int(11)			NOT NULL		AUTO_INCREMENT,
	`user_id`				int(11)			NOT NULL,

	PRIMARY KEY(`admin_id`)
);

-- subscriptions table structure
CREATE TABLE IF NOT EXISTS `subscriptions` (
	`subscription_id`		int(11)			NOT NULL		AUTO_INCREMENT,
	`description`			varchar(255),
	`type`					varchar(30)		NOT NULL		UNIQUE,

	PRIMARY KEY(`subscription_id`)
);

-- Reported_Content table structure
CREATE TABLE IF NOT EXISTS 'reported_content' (
	'report_id'				int(11)			NOT NULL		AUTO_INCREMENT,
	'reported_profile_id'	int(11)			NOT NULL,
	'reporter_profile_id'	int(11)			NOT NULL,
	'video_id'				int(11)			NOT NULL,
	'picture_id'			int(11)			NOT NULL,
	'date_reported'			TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP,
	'description'			varchar(255),

	PRIMARY KEY('report_id')
);

-- payments table structure
CREATE TABLE IF NOT EXISTS `payments` (
	`payment_id`			int(11)			NOT NULL		AUTO_INCREMENT,
	`card_type`				varchar(30)		NOT NULL,
	`card_number`			varchar(20)		NOT NULL		UNIQUE,
	`address`				varchar(255)	NOT NULL,
	`city`					varchar(30)		NOT NULL,
	`state`					varchar(2)		NOT NULL,
	`zip`					varchar(5)		NOT NULL,
	`payment_name`			varchar(30)		UNIQUE,

	PRIMARY KEY(`payment_id`)
);

-- user_payments table structure
CREATE TABLE IF NOT EXISTS `user_payments` (
	`payment_id`			int(11)			NOT NULL,
	`user_id`				int(11)			NOT NULL,
	`date_created`			TIMESTAMP		DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY(`payment_id`, `user_id`)
);

-- transactions table structure
CREATE TABLE IF NOT EXISTS `transactions` (	
	`user_id`				int(11)			NOT NULL,
	`payment_id`			int(11)			NOT NULL,
	`date_paid`				TIMESTAMP		DEFAULT CURRENT_TIMESTAMP,
	`amount`				decimal(7,2)	NOT NULL,

	PRIMARY KEY(`payment_id`, `user_id`)
);

-- styles table structure
CREATE TABLE IF NOT EXISTS `styles`	(
	`style_id`				int(11)			NOT NULL		AUTO_INCREMENT,
	`style_path`			varchar(255)	NOT NULL		UNIQUE,

	PRIMARY KEY(`style_id`)
);

-- premium styles table structure
CREATE TABLE IF NOT EXISTS `premium_styles` (
	`premium_style_id`		int(11)			NOT NULL		AUTO_INCREMENT,
	`style_path`			varchar(255)	NOT NULL		UNIQUE,
	`date_created`			TIMESTAMP		DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY(`premium_style_id`)
);

-- profiles table structure
CREATE TABLE IF NOT EXISTS `profiles`	(
	`profile_id`			int(11)			NOT NULL		AUTO_INCREMENT,
	`user_id`				int(11)			NOT NULL,
	`profile_pic_path`		varchar(255)	DEFAULT NULL,
	`previous_style_id`		int(11)			DEFAULT NULL,

	PRIMARY KEY(`profile_id`)
);

-- profile_styles table structure
CREATE TABLE IF NOT EXISTS `profile_styles` (
	`profile_id`			int(11)			NOT NULL,
	`premium_style_id`		int(11)			NOT NULL,

	PRIMARY KEY(`profile_id`, `premium_style_id`)
);

-- pictures table structure
CREATE TABLE IF NOT EXISTS `pictures` (
	`picture_id`			int(11)			NOT NULL		AUTO_INCREMENT,
	`profile_id`			int(11)			NOT NULL,
	`picture_path`			varchar(255)	NOT NULL		UNIQUE,
	`size`					int(11),
	`resolution`			varchar(9),
	`style_id`				int(11),
	`premium_style_id`		int(11),
	`date_created`			TIMESTAMP		DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY(`picture_id`)
);

-- videos table structure
CREATE TABLE IF NOT EXISTS `videos` (
	`video_id`				int(11)			NOT NULL		AUTO_INCREMENT,
	`profile_id`			int(11)			NOT NULL,
	`video_path`			varchar(255)	NOT NULL		UNIQUE,
	`video_legth`			TIME,
	`style_id`				int(11),
	`premium_style_id`		int(11),
	`date_created`			TIMESTAMP		DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY(`video_id`)
);

 -- usages table structure
CREATE TABLE IF NOT EXISTS `usages` (
	`usage_id`				int(11)			NOT NULL		AUTO_INCREMENT,
	`process_time`			TIME 			DEFAULT '00:00:00',
	`content_size`			int(11),
	`profile_id`			int(11),
	`style_id`				int(11),
	`premium_style_id`  	int(11),
	`content_path`			varchar(255)	NOT NULL		UNIQUE,

	PRIMARY KEY(`usage_id`)
);

/***********************************************
*			TABLE CONSTRAINTS 				   *
***********************************************/

-- USERS table constraints
ALTER TABLE users
	ADD FOREIGN KEY(subscription_id)		REFERENCES subscriptions(subscription_id);

-- ADMINS table constraints
ALTER TABLE admins
	ADD FOREIGN KEY(user_id) 				REFERENCES users(user_id);

-- USER_PAYMENTS table constraints
ALTER TABLE user_payments
	ADD FOREIGN KEY(payment_id)				REFERENCES payments(payment_id);
ALTER TABLE user_payments
	ADD FOREIGN KEY(user_id)				REFERENCES users(user_id);

-- REPORTED_CONTENT table constraints
ALTER TABLE reported_content
	ADD FOREIGN KEY(reported_profile_id)	REFERENCES profiles(profile_id);
ALTER TABLE reported_content
	ADD FOREIGN KEY(reporter_profile_id)	REFERENCES profiles(profile_id);
ALTER TABLE reported_content
	ADD FOREIGN KEY(video_id)				REFERENCES videos(video_id);
ALTER TABLE reported_content
	ADD FOREIGN KEY(picture_id)				REFERENCES pictures(picture_id);				

-- TRANSACTIONS table constraints
ALTER TABLE transactions
	ADD FOREIGN KEY(payment_id)				REFERENCES payments(payment_id);
ALTER TABLE transactions
	ADD FOREIGN KEY(user_id)				REFERENCES users(user_id);

-- PROFILES table constraints
ALTER TABLE profiles
	ADD FOREIGN KEY(previous_style_id)		REFERENCES styles(style_id);
ALTER TABLE profiles
	ADD FOREIGN KEY(user_id)				REFERENCES users(user_id);

-- PROFILE_STYLES table constraints
ALTER TABLE profile_styles
	ADD FOREIGN KEY(profile_id)				REFERENCES profiles(profile_id);
ALTER TABLE profile_styles
	ADD FOREIGN KEY(premium_style_id)		REFERENCES premium_styles(premium_style_id);

-- PICTURES table constraints
ALTER TABLE pictures
	ADD FOREIGN KEY(profile_id)				REFERENCES profiles(profile_id);
ALTER TABLE pictures
	ADD FOREIGN KEY(style_id)				REFERENCES styles(style_id);
ALTER TABLE pictures
	ADD FOREIGN KEY(premium_style_id)		REFERENCES premium_styles(premium_style_id);

-- VIDEOS table constraints
ALTER TABLE videos
	ADD FOREIGN KEY(profile_id)				REFERENCES profiles(profile_id);
ALTER TABLE videos
	ADD FOREIGN KEY(style_id)				REFERENCES styles(style_id);
ALTER TABLE videos
	ADD FOREIGN KEY(premium_style_id)		REFERENCES premium_styles(premium_style_id);

-- USAGES table constraints
ALTER TABLE usages
	ADD FOREIGN KEY(profile_id)				REFERENCES profiles(profile_id);
ALTER TABLE usages
	ADD FOREIGN KEY(style_id)				REFERENCES styles(style_id);
ALTER TABLE usages
	ADD FOREIGN KEY(premium_style_id)		REFERENCES premium_styles(premium_style_id);