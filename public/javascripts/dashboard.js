$(function() {
      // #time
      function updateTime() {
	  var now = $.now();
	  $('#date #time').html($.format.date(now, "h:mm a"));
	  $('#date #day').html($.format.date(now, "ddd"));
      }
      updateTime();
      setInterval(updateTime, 5000);


  });