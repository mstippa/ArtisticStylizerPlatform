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
    $('#imagepreview').attr('src', contentURL);
    $('.sk-folding-cube').css({
      visibility: 'hidden'
    });
    $('#imagepreview').css({
      visibility: 'visible'
    });
    $('#homeModal').modal('show');
  });

  // facebook share button
  $('.fb-share-button').on('click', function() {
    $(this).attr('data-href', contentURL);
  })


  // calls readURL function when user uploads a photo
  $("#uploadPhoto").change(function () {
      readURL(this, 'uploaded-image');
  });

  // calls readURL function when user uploads a video
  $("#uploadVideo").change(function () {
      readURL(this, 'uploaded-image');
  });

  // displays the uploaded image or video in a modal
  function readURL(input, id) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
              $('#' + id).attr('src', e.target.result);
              $('.sk-folding-cube').css({
                visibility: 'hidden'
              });
              $('#uploaded-image').css({
                visibility: 'visible'
              })
              $('#uploadModal').modal('show');
          }

          reader.readAsDataURL(input.files[0]);
      }
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

  // hides the upload modal when the save
  $('#saveButton').click(function() {
    $('#homeModal').modal('hide');

  });

  // hides the image in the modal when a style is clicked and shows the loading animation
  $('.thumbnails').click(function() {
    $('#uploaded-image').css({
      visibility: 'hidden'
    });
    $('#imagepreview').css({
      visibility: 'hidden'
    });
    $('.sk-folding-cube').css({
      visibility: 'visible'
    });

    // call stop animation function
    stopAnimation();
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
    $('#imagepreview').css({
      visibility: 'visible'
      });
    }, 4000);
  }

  $


})


