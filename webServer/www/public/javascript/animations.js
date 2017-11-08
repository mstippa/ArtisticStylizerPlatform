// global varialbes
var bounce = 150;
var delay = 0;


$(document).ready(function(){


	$('#stick').delay(200).animate({
		left: '5000px'
	}, {
		step: function(currentLeft) { 
	        var letter;
	        var letterPostion;


	        $('.logo-div').each(function(n,item){
	        	letter = $(item);
	        	letterPostion = letter.position().left
	        	if (letterPostion < currentLeft) {
	        		$(letter).css({
	        			opacity: 1
	        		})
	        	}
	        })	
	    } 		
	},"slow");


})		