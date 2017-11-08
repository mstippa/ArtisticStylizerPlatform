/** video.js **/

function Video(videoid,profileId, videoPath, video_length, style_id, premium_style_id, date_created){
	this.videoid      = videoid;
	this.profileid    = profileId;
	this.videoPath    = videoPath;
	this.videoLength  = video_length;
	this.styleid 	  = style_id;
	this.psid         = premium_style_id;
	this.dateCreated  = date_created;
}

module.exports = Video;