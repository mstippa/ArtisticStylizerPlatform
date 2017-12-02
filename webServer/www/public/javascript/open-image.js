// this js page deals with everything modal

// global variable that holds the src of a clicked on image to be displayed in a modal
var contentURL;

// global variable that holds the response 
var response;

$(document).ready(function(){

  // turn of auto cycle in the carousel
  $('.carousel').carousel({
    interval: false
  }); 

  // dislplays the clicked on image in a modal on the explore page
	$('.pop').on('click', function() {
		$('#imagepreview').attr('src', $(this).find('img').attr('src'));
    $('#imagepreview').css({
      visibility: 'visible'
    });
		$('#exploreModal').modal('show');
	});

  // displays the clicked on image in a modal on the home page
  $('.pop').on('click', function() {
    contentURL = $(this).find('img').attr('src');
    $('#uploaded-image').attr('src', contentURL);
    $('.sk-folding-cube').css({
      visibility: 'hidden'
    });
    $('#uploadModal').modal('show');
  });

  // facebook share button
  $('.fb-share-button').on('click', function() {
    $(this).attr('data-href', contentURL);
  })


  // calls uploadcontent and readURL function when user uploads a photo
  $("#uploadPhoto").change(function () {
    uploadContent('uploadPhotoForm');
    readURL( this.value);
  });


  // displays the uploaded image or video in a modal
  function readURL(inputName) {
    inputName = inputName.replace(/.*[\/\\]/, '');
    console.log(inputName);

    document.getElementById('uploaded-image').src = '/tmp/'+inputName;

    $('.sk-folding-cube').css({
      visibility: 'hidden'
    });
    $('#uploaded-image').css({
      visibility: 'visible'
    })
    $('#uploadModal').modal('show');
  }    
  
  // displays the uploaded profile pic
  function changeProfilePic(inputName) {
    inputName = inputName.replace(/.*[\/\\]/, '');

    document.getElementById('ProfileImage').src = '/profiles/'+ response + '/' + inputName;
    
  }
    
  // calls changeProfilePic when user chooses to change their profile pic
  $("#changeProfilePicInput").change(function(){
    uploadProfilePic('uploadProfilePicForm');
    changeProfilePic(this.value);
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
    stopAnimation();  


    var style = $(this).find('img').attr('src');
    style = style.replace(/.*[\/\\]/, '');
    var content = document.getElementById('uploaded-image').src;
    content = content.replace(/.*[\/\\]/, '');
    console.log(style);
    console.log(content);
    styleContent(content, 'van_gogh_vincent_7.jpg');
    document.getElementById('uploaded-image').src = '/public/tmp/result.jpg';
    
  });

  // calls uploadStyle when user chooses to upload a style
  $('#stylePhoto').change(function() {
    var content = $('#uploaded-image').attr('src');
    uploadStyle(content);
  })

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

    var contentToSave = document.getElementById('uploaded-image').src;
    contentToSave = contentToSave.replace(/.*[\/\\]/, '');
    saveContent(contentToSave);
    console.log(response);
    if (response === "saved") {
      $('#uploaded-image').css({
      visibility: 'hidden'
    });
    }
  });

})

// sends the upload photo form to the content-upload controller
function uploadContent(contentForm) {
    var xhttp = new XMLHttpRequest();
    var form = document.getElementById(contentForm);
    var formData = new FormData(form);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          response = String(this.responseText);
          console.log(response);
       } else {
        return false;
       }
    };
    xhttp.open("POST", "contentUpload", false);
    xhttp.send(formData);
}

// sends the content path and style path to the sytle-content-controller
function styleContent(content, style) {

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        response = this.responseText;
        console.log(response);
        return (this.responseText);
     } else {
      return false;
     }
  };
  xhttp.open("POST", "style-content", false);
  xhttp.send(content + " " + style);
}

// sends the content path and upload style form to the style-upload-controller 
function uploadStyle(contentPath) {
  var http = new XMLHttpRequest();
  var form = document.getElementById('uploadStyleForm');
  var formData = new FormData(form);
  console.log(formData);
  http.open("POST", "styleUpload", true);
  // var form = document.getElementById("uploadPhotoForm").value;
  http.send(contentPath, formData); 
}

// sends the stylized photo to the save-content controller to be saved
function saveContent(contentPath) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        response = String(this.responseText);
        console.log(response);
     } else {
      return false;
     }
  };
  xhttp.open("POST", "save-content", false);
  xhttp.send(contentPath); 
}


function uploadProfilePic(profilePicForm) {
  var xhttp = new XMLHttpRequest();
  var form = document.getElementById(profilePicForm);
  var formData = new FormData(form);
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        response = String(this.responseText);
        console.log(response);
     } else {
      return false;
     }
  };
  xhttp.open("POST", "uploadProfilePic", false);
  xhttp.send(formData);
}


