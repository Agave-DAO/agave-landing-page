$(function(){
  $('.homepage').hide();
  $('.box').delay(1000).effect("bounce", { times: 10 }, 2000);
  $('.box').hide().slideDown(1500);

  $( '#alvin' ).click(function() {
    $('#alvin').effect( "explode", { times: 3 }, "slow" );
  });
  
  $('button').hover(
    function() {
      $( this ).text( "Good Morning")
  });
  
  $('button').click(function(){
    $('.intro').slideUp(400);
     $('.box').slideUp(200);
    $('.homepage').delay(500).slideDown(300);
  });
  
});