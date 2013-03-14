$(document).ready(function(){

  // date select field
  $('.datepicker').datepicker();

  // tag preview box
  $('#tags').bind('input propertychange', function() {

      $('#tag-preview').empty();

      var tags = $('#tags').val().split(',').map(function(tag){

          var clean = tag.trim().toLowerCase();
          $('#tag-preview').append('<span class="label label-info">' + clean + '</span>');

          return clean;

        });
  });
  
});
