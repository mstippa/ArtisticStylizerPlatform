// a bunch of helper functions

$(document).ready(function(){
	$('#getStarted').click(function() {
		window.location.replace("http://10.10.7.179:8086/create-account");
	})


	$('#upgradeButton').click(function() {
		upgradeAccount();
	})

})

function upgradeAccount() {
	var xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {
     	if (this.readyState == 4 && this.status == 200) {
        	window.location.replace("http://10.10.7.179:8086/home");
      	} 
  	};
  	xhttp.open("POST", "upgradeToPremium", false);
  	xhttp.send();

}

