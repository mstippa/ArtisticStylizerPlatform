tabase: Artistic styler platform
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS 'users' (
	'user_id' 			int(11) 		NOT NULL 		AUTO_INCREMENT,
	'username' 			varchar2(30) 	NOT NULL 		UNIQUE,
	'email_address' 	varchar2(30) 	NOT NULL 		UNIQUE,
	'password' 			varchar2(255) 	NOT NULL,
	'dob' 				DATE() 			DEFAULT NULL,
	'fname' 			varchar2(20),
	'lname' 			varchar2(20)
)

CREATE TABLE IF NOT EXISTS 'admins' (
	'admin_id'			int(11)			NOT NULL		AUTO_INCREMENT,
	'user_id'			int(11)			NOT NULL
)

CREATE TABLE IF NOT EXISTS 'subscriptions' (
	'subsription_id'	int(11)			NOT NULL		AUTO_INCREMENT,
	'description'		varchar2(255)
)

CREATE TABLE IF NOT EXISTS 'user_subsriptions' (
	'subsription_id'	int(11)			NOT NULL		AUTO_INCREMENT,
	'user_id'			int(11)			NOT NULL,
	'date_paid'			DATETIME()		NOT NULL
)

CREATE TABLE IF NOT EXISTS 'payments' (
	'payment_id'		int(11)			NOT NULL		AUTO_INCREMENT,
	'card_type'			varchar2(30)	NOT NULL,
	'card_number'		int(16)			NOT NULL,
	'address'			varchar2(255)	NOT NULL,
	'state'				varchar2(2)		NOT NULL,
	'zip'				int(5)			NOT NULL,
	'security_code'		varchar2(255)
)

CREATE TABLE IF NOT EXISTS 'transactions' (
	'transaction_id'	int(11)			NOT NULL		AUTO_INCREMENT
	'user_id'			int(11)			NOT NULL,
	'date_paid'			DATETIME()		NOT NULL,
	'amount'			decimal(7,2)	NOT NULL,
	'payment_id'		int(11)			NOT NULL
)

CREATE TABLE IF NOT EXISTS 'styles'	(
	'style_id'			int(11)			NOT NULL		AUTO_INCREMENT,
	'syle_path'			varchar2(255)	NOT NULL
)

CREATE TABLE IF NOT EXISTS 'premium_styles' (
	'premium_style_id'	int(11)			NOT NULL		AUTO_INCREMENT,
	'style_path'		varchar2(255)	NOT NULL,
	'date_created'		DATETIME()
)

CREATE TABLE IF NOT EXISTS 'profiles'	(
	'profile_id'		int(11)			NOT NULL		AUTO_INCREMENT,
	'user_id'			int(11)			NOT NULL,
	'profile_pic_path'	varchar2(255)	DEFAULT NULL,
	'previous_style_id'	int(11)			DEFAULT NULL
)

CREATE TABLE IF NOT EXISTS 'profile_styles' (
	'profile_id'		int(11)			NOT NULL,
	'premium_style_id'	int(11)			NOT NULL
)

CREATE TABLE IF NOT EXISTS 'pictures' (
	'picture_id'		int(11)			NOT NULL		AUTO_INCREMENT,
	'profile_id'		int(11)			NOT NULL,
	'picture_path'		varchar2(255)	NOT NULL,
	'size'				int(11),
	'resolution'		varchar2(9),
	'style_id'			int(11),
	'premium_style_id'	int(11),
	'date_created'		DATETIME()		NOT NULL
)

CREATE TABLE IF NOT EXISTS 'videos' (
	'video_id'			int(11)			NOT NULL		AUTO_INCREMENT,
	'profile_id'		int(11)			NOT NULL,
	'video_path'		varchar2(255)	NOT NULL,
	'video_legth'		TIME(),
	'style_id'			int(11),
	'premium_style_id'	int(11),
	'date_created'		DATETIME()		NOT NULL
)

CREATE TABLE IF NOT EXISTS 'usages' (
	'usage_id'			int(11)			NOT NULL		AUTO_INCREMENT,
	'startTime'			DATETIME		NOT NULL,
	'endTime'			DATETIME		NOT NULL,
	'content_size'		int(11)			NOT NULL,
	'profile_id'		int(11)			NOT NULL,
	'style_id'			int(11)			NOT NULL
)

ALTER TABLE users
	ADD PRIMARY KEY(user_id);

ALTER TABLE admins
	ADD FOREIGN KEY(user_id) 			REFERENCES users;
ALTER TABLE admins
	ADD PRIMARY KEY(admin_id);

ALTER TABLE subscriptions
	ADD PRIMARY KEY(subsription_id);

ALTER TABLE user_subsriptions
	ADD FOREIGN KEY(subsription_id) 	REFERENCES subscriptions;
ALTER TABLE user_subsriptions
	ADD FOREIGN KEY(user_id)			REFERENCES users;
ALTER TABLE user_subsriptions
	ADD PRIMARY KEY(subsription_id,user_id);

ALTER TABLE payments
	ADD PRIMARY KEY(payment_id);

ALTER TABLE transactions
	ADD FOREIGN KEY(payment_id)			REFERENCES payments;
ALTER TABLE transactions
	ADD FOREIGN KEY(user_id)			REFERENCES users;
ALTER TABLE transactions
	ADD PRIMARY KEY(transaction_id);

ALTER TABLE styles
	ADD PRIMARY KEY(style_id);

ALTER TABLE premium_styles
	ADD PRIMARY KEY(premium_style_id);

ALTER TABLE profiles
	ADD FOREIGN KEY(previous_style_id)	REFERENCES styles(style_id);
ALTER TABLE profiles
	ADD FOREIGN KEY(user_id)			REFERENCES users;
ALTER TABLE profiles
	ADD PRIMARY KEY(profile_id);

ALTER TABLE profile_styles
	ADD FOREIGN KEY(profile_id)			REFERENCES profiles;
ALTER TABLE profile_styles
	ADD FOREIGN KEY(premium_style_id)	REFERENCES premium_styles;
ALTER TABLE profile_styles	
	ADD PRIMARY KEY(profile_id,premium_style_id);

ALTER TABLE pictures
	ADD FOREIGN KEY(profile_id)			REFERENCES profiles;
ALTER TABLE pictures
	ADD FOREIGN KEY(style_id)			REFERENCES styles;
ALTER TABLE pictures
	ADD FOREIGN KEY(premium_style_id)	REFERENCES premium_styles;
ALTER TABLE
	ADD PRIMARY KEY(picture_id);

ALTER TABLE videos
	ADD FOREIGN KEY(profile_id)			REFERENCES profiles;
ALTER TABLE videos
	ADD FOREIGN KEY(style_id)			REFERENCES styles;
ALTER TABLE videos
	ADD FOREIGN KEY(premium_style_id)	REFERENCES premium_styles;
ALTER TABLE
	ADD PRIMARY KEY(video_id);

ALTER TABLE usages
	ADD FOREIGN KEY(profile_id)			REFERENCES profiles;
ALTER TABLE useages
	ADD FOREIGN KEY(style_id)			REFERENCES styles;
ALTER TABLE usages
	ADD PRIMARY KEY(usage_id);
