// this js page deals with everything modal

// global variable that holds the src of a clicked on image to be displayed in a modal
var contentURL;

// global variable that holds the response 
var response;

$( window ).on( "load", function() {$('.deleteButtons').css({visibility: 'visible'})});

$(document).ready(function(){

  // turn of auto cycle in the carousel
  $('.carousel').carousel({
    interval: false
  });
	
// hide the fail message
  $('#failMessage').css({
    visibility: 'hidden'
  });
	
 $('#closeButton').on('click', function() {
    $('#uploaded-image').attr('src', '');
    $('#failMessage').css({
      visibility: 'hidden'
    });
  })

  // dislplays the clicked on image in a modal on the explore page
	$('.pop').on('click', function() {
		$('#imagepreview').attr('src', $(this).find('img').attr('src'));
    $('#imagepreview').attr('name', $(this).find('img').attr('name'));
    console.log($('#imagepreview').attr('name'));
    $('#imagepreview').css({
      visibility: 'visible'
    });
		$('#exploreModal').modal('show');
	});

  // displays the clicked on image in a modal on the home page
  $('.pop').on('click', function() {
    contentURL = $(this).find('img').attr('src');
    $('#uploaded-image').attr('src', contentURL);
    $('#styled-image').attr('src', contentURL);
    $('#styled-image').css({
      visibility: 'hidden'
    });
    $('.sk-folding-cube').css({
      visibility: 'hidden'
    });
	$('#failMessage').css({
      visibility: 'hidden'
    });
    $('#uploadModal').modal('show');
  });

  // facebook share button
  $('.fb-share-button').on('click', function() {
    $(this).attr('data-href', contentURL);
  });


  // calls uploadcontent and readURL function when user uploads a photo
  $("#uploadPhoto").change(function () {
    var inputName = this.value;
    inputName = inputName.replace(/.*[\/\\]/, '');
    uploadContent('uploadPhotoForm', inputName);
  });

  $("#uploadStyle").change(function () {
    var inputName = this.value;
    inputName = inputName.replace(/.*[\/\\]/, '');
    uploadStyle('uploadStyleForm', inputName);
  });


  
  // displays the uploaded profile pic
  function changeProfilePic(inputName) {
    inputName = inputName.replace(/.*[\/\\]/, '');
    document.getElementById('ProfileImage').src = '/profiles/'+ response + '/' + inputName;   
  }
    
  // calls changeProfilePic when user chooses to change their profile pic
  $("#changeProfilePicInput").change(function(){
    var inputName = this.value;
    inputName = inputName.replace(/.*[\/\\]/, '');
    uploadProfilePic('uploadProfilePicForm', inputName);
    // changeProfilePic(this.value);
  });

  // report content pop up 
  $('#contact').click(function() {
    $('#contactForm').fadeToggle();
  });

  
  $(document).mouseup(function (e) {
    var container = $("#contactForm");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.fadeOut();
    }
  });

  // hides the upload modal when the save
  $('#saveButtonUpload').click(function() {
    $('#uploadModal').modal('hide');
  });



  // hides the image in the modal when a style is clicked, shows the loading animation and calls styleContent
  $('.default-style').click(function() {
    $('#uploaded-image').css({
      visibility: 'hidden'
    });
    $('.sk-folding-cube').css({
      visibility: 'visible'
    });

    // start the loading animation
    // stopAnimation();  


    var style = $(this).find('img').attr('src');

    // style = style.replace(/.*[\/\\]/, '');
    var content = document.getElementById('uploaded-image').src;
    console.log(content);
    content = content.replace(/^(?:\/\/|[^\/]+)*\//, "");

    styleContent(content, style);
    
    $('.sk-folding-cube').css({
      visibility: 'visible'
    });

    $('#uploaded-image').css({
      visibility: 'hidden'
    });
    
    
  });

  // calls uploadStyle when user chooses to upload a style
  $('#stylePhoto').change(function() {
    var content = $('#uploaded-image').attr('src');
    uploadStyle(content);
  });

  // function will hide the animation and display the stylized image in the modal after 4 seconds
  function stopAnimation() {
    setTimeout(function(){ 
      $('.sk-folding-cube').css({
      visibility: 'hidden'
      });
      $('#uploaded-image').css({
      visibility: 'visible'
    });
    }, 4000);
  }

  // call saveContent when the save button is clicked
  $('#saveButton').click(function() {
    // var contentToSave = $('#uploaded-image').attr('src');

    var contentToSave = document.getElementById('styled-image').src;
    contentToSave = contentToSave.replace(/.*[\/\\]/, '');
    saveContent(contentToSave);
  });

  $('#deleteButton').click(function() {
    var contentToDelete = $(this).parent().find('img').attr('src');
    contentToDelete = contentToDelete.replace(/.*[\/\\]/, '');
    deleteContent(contentToDelete);
  });

  $('#reportContentButton').click(function() {

    var pictureId = document.getElementById('imagepreview').name;
    var reportDescription = document.getElementById('report-description').value;
    console.log(reportDescription);
    reportContent(pictureId, reportDescription);

    $('#exploreModal').modal('hide');
  });

	$('#profile-btn').click(function() {
    var pictureid = document.getElementById('imagepreview').name;
    exploreProfile(pictureid);
  });

})

////////////////////////////////////////////////

//      All Our Ajax Requests for the modal
  
//////////////////////////////////////////////



// sends the upload photo form to the content-upload controller
function uploadContent(contentForm, inputName) {
    var xhttp = new XMLHttpRequest();
    var form = document.getElementById(contentForm);
    var formData = new FormData(form);

    xhttp.open("POST", "contentUpload", true);
    
    xhttp.upload.onprogress = function(e){
      if(e.lengthComputable){
        var percentage = (e.loaded / e.total)*100;
        console.log(percentage+"%");
        $('.sk-folding-cube').css({
          visibility: 'visable'
        });
      }
    };
    xhttp.onerror = function(e){
      console.log('Error: ', e);
    };
    xhttp.onload = function(e){
      readURL(xhttp.responseText);
      $('.sk-folding-cube').css({
        visibility: 'hidden'
      });    
    };
    xhttp.send(formData);
}

// sends the upload style form to the content-upload controller
function uploadStyle(contentForm, inputName) {
    var xhttp = new XMLHttpRequest();
    var form = document.getElementById(contentForm);
    var formData = new FormData(form);

    xhttp.open("POST", "styleUpload", true);
    
    xhttp.upload.onprogress = function(e){
      if(e.lengthComputable){
        var percentage = (e.loaded / e.total)*100;
        console.log(percentage+"%");
        $('.sk-folding-cube').css({
          visibility: 'visible'
        });
      }
    };
    xhttp.onerror = function(e){
      console.log('Error: ', e);
    };
    xhttp.onload = function(e){
      var response = xhttp.responseText;
      var styleName = response.substr(0, response.indexOf(" "));
      var profileId = response.substr(response.indexOf(" ") + 1, response.length-1);
      var style = '/profiles/'+profileId+'/styles/'+styleName;
      console.log(style);
      var content = document.getElementById('uploaded-image').src;
      content = content.replace(/^(?:\/\/|[^\/]+)*\//, "");
      console.log(content);
      styleContent(content, style);    
    };
    xhttp.send(formData);
}

// sends the content path and style path to the sytle-content-controller
function styleContent(content, style) {

  var xhttp = new XMLHttpRequest();
  
  xhttp.open("POST", "/style-content", true);
  xhttp.onprogress = function () {
    console.log(xhttp.response); // readyState will be 3
  };

  xhttp.onload = function () {
      document.getElementById('styled-image').src = '/tmp/'+xhttp.responseText;
      $('#styled-image').css({
        visibility: 'visible'
      });
      $('.sk-folding-cube').css({
        visibility: 'hidden'
      });
      $('#uploaded-image').css({
        visibility: 'hidden'
      });
      $('#styled-image').css({
        visibility: 'hidden'
      });
      $('#uploadModal').modal('show');
  };
  xhttp.send(content + " " + style);
}

// sends the content path and upload style form to the style-upload-controller 
// function uploadStyle(contentPath) {
//   var xhr = new XMLHttpRequest();
//   var form = document.getElementById('uploadStyleForm');
//   var formData = new FormData(form);
 
//   xhr.open("POST", "styleUpload", true);
 
//   xhr.onprogress = function () {
//     console.log(xhr.response); // readyState will be 3
//   };

//   xhr.onload = function () {
//     console.log('DONE', xhr.response); // readyState will be 4
//   };
  
//   http.send(contentPath, formData); 
// }

// sends the stylized photo to the save-content controller to be saved
function saveContent(contentPath) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        response = String(this.responseText);
        if (xhttp.responseText !== "fail") {
	         window.location.replace(window.location.href);
        } else {
          $('#failMessage').css({
            visibility: 'visible'
          });

        }  
     }
  };
  xhttp.open("POST", "/save-content", true);
  xhttp.send(contentPath); 
}

function deleteContent(contentPath) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        response = String(this.responseText);
        console.log(xhttp.responseText);
        if (xhttp.responseText === "deleted") {
          window.location.replace(window.location.href);
        } else { 
          
        }
      } 
  };
  xhttp.open("POST", "/delete-content", true);
  xhttp.send(contentPath); 
}


function uploadProfilePic(profilePicForm, inputName) {
  var xhttp = new XMLHttpRequest();
  var form = document.getElementById('changeProfilePicForm');
  var formData = new FormData(form);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById('profileImage').src = '/profiles/'+ this.responseText + '/profilePic.jpg';
        document.getElementById('profilePic').src = '/profiles/'+ this.responseText + '/profilePic.jpg';
      } 
  };
  xhttp.open("POST", "uploadProfilePic", true);
  xhttp.send(formData);
}


function reportContent(pictureId, reportDescription) {
  var xhttp = new XMLHttpRequest();
  var form = document.getElementById('reportContentForm');
  var formData = new FormData(form);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      } 
  };
  xhttp.open("POST", "reportContent", true);
  xhttp.send(pictureId + " " + reportDescription);

}

function exploreProfile(pictureid) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
      } 
  };
  xhttp.open("POST", "account", true);
  xhttp.send(pictureId);
}

  // displays the uploaded image or video in a modal
  function readURL(inputName) {
    document.getElementById('uploaded-image').src = '/tmp/'+inputName;
    document.getElementById('styled-image').src = '/tmp/'+inputName;
    $('.sk-folding-cube').css({
      visibility: 'hidden'
    });
    $('#failMessage').css({
      visibility: 'hidden'
    });
    $('#uploaded-image').css({
      visibility: 'visible'
    });
    $('#styled-image').css({
      visibility: 'hidden'
    });
    $('#uploadModal').modal('show');
  }   

