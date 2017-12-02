/*************************************************************
	ASP DATABASE INSERT SUBSCRIPTIONS
	
	Purpose:
		-Used to source subscription statuses


	Author:			Anthony Soricelli
	Last edit:		12/02/2017

*************************************************************/

-- use asp database so we can do things with it
use asp_database;

/**************************************
*		INSERTING SUBSCRIPTIONS		  *
**************************************/

INSERT INTO subscriptions(description, type)
	VALUES ("Free User Subscription", "FREE");

INSERT INTO subscriptions(description, type)
	VALUES ("Premium User Subscription", "PREMIUM");
