// Animate the footer to give us a little more real estate
$(function() {
      window.footer = $('#footer');
      var delay = 8000;
      var slideLeft = function() {
	var topdiv = window.footer.children().first();
	var width = parseFloat(topdiv.css('margin-left')) + parseFloat(topdiv.css('margin-right')) +
	      parseFloat(topdiv.css('padding-left')) + parseFloat(topdiv.css('padding-right'));
	width = width + topdiv.find('img').width();
	topdiv.animate({marginLeft: '-' + width + 'px'}, 
		       {duration: 800, complete:function() {
			    topdiv.detach();
			    topdiv.appendTo(window.footer);
			    topdiv.css('margin-left', '');
			    setTimeout(slideLeft, delay);
			}});
      };
      setTimeout(slideLeft, delay);
  });