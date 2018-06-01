$(document).ready(function(){
  console.log(window.location.pathname);

  $('#refresh').on('click', function(e){
    e.preventDefault();
    $("#myModal").css("display", "block");
    $.ajax('/refresh')
      .then(data => {
        location.reload();
      })
      .catch(data => {
        alert('refresh failed');
      });
  });

  $('form').on('submit', function(e){
    e.preventDefault();
    var name = $('#name').val();
    var email = $('#email').val();
    var body = $('#body').val();
    $.post(window.location.pathname + '/comment', {name, email, body})
      .then(data => {
        location.reload();
      })
      .catch(data => {
        alert('comment failed');
      });
  });
});