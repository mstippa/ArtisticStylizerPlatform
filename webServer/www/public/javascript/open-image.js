$(document).ready(function(){
  // $(".openImage").on("click", function() {
  //    $('.imagepreview').attr('src', $(this).find('img').attr('src'));
  //    $('#image-modal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
  // });
// })
// $(function() {
		$('.pop').on('click', function() {
			console.log($(this).find('img').attr('src'));
			$('#imagepreview').attr('src', $(this).find('img').attr('src'));
			$('#imagemodal').modal('show');
		});
})
