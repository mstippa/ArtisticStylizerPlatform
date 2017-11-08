/** picture.js **/

function Picture(pictureid,profileId, picturePath, size, resolution, style_id, premium_style_id, date_created){
	this.pictureid    = pictureid;
	this.profileid    = profileId;
	this.picturePath  = picturePath;
	this.size         = size;
	this.resolution   = resolution;
	this.styleid 	  = style_id;
	this.psid         = premium_style_id;
	this.dateCreated  = date_created;
}

module.exports = Picture;