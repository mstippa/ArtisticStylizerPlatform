// this js page deals with everything modal



var contentURL;

$(document).ready(function(){

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
    uploadContent('uploadPhotoForm')
    readURL( this.value);
  });

  // calls uploadcontent and readURL function when user uploads a video
  $("#uploadVideo").change(function () {
      uploadContent('uploadVideoForm');
      readURL(this.value);
  });

  // displays the uploaded image or video in a modal
  function readURL(inputName) {
    inputName = inputName.replace(/.*[\/\\]/, '');
    console.log($('#profilePic').attr('src'))

    $('#uploaded-image').attr('src', '/tmp/'+ inputName);
    // $('#' + id).attr('src', e.target.result);
    $('.sk-folding-cube').css({
      visibility: 'hidden'
    });
    $('#uploaded-image').css({
      visibility: 'visible'
    })
    $('#uploadModal').modal('show');
  }    
  
  // displays the uploaded profile pic
  function changeProfilePic(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            $('#profileImage').attr('src', e.target.result);
        }
        
        reader.readAsDataURL(input.files[0]);
    }
  }
    
    // calls changeProfilePic when user chooses to change their profile pic
    $("#changeProfilePicInput").change(function(){
        changeProfilePic(this);
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

    // call stop animation function
    stopAnimation();  

    var style = $(this).find('img').attr('src');
    var content = $('#uploaded-image').attr('src');
    console.log(style);
    console.log(content);
    styleContent(content, style);

  });

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
    var contentToSave = $('#uploaded-image').attr('src');
    saveContent(contentToSave);
  });

})

// sends the upload photo form to the content-upload controller
function uploadContent(contentForm) {
    var xhttp = new XMLHttpRequest();
    var form = document.getElementById(contentForm);
    var formData = new FormData(form);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var response = this.responseText;
          console.log(response);
          return (this.responseText);
       } else {
        return false;
       }
    };
    xhttp.open("POST", "contentUpload", false);
    xhttp.send(formData); 

}

// sends the content path and style path to the sytle-content-controller
function styleContent(contentPath, stylePath) {
  var http = new XMLHttpRequest();
  // var form = document.getElementById('stylePhotoForm');
  // var formData = new FormData(form);
  http.open("POST", "style-content", true);
  http.send(contentPath, stylePath);
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
  var http = new XMLHttpRequest();
  http.open("POST", "save-content", true);
  http.send(contentPath);
}


