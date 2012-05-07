// Animate the footer to give us a little more real estate
$(function() {
      window.footer = $('#footer');
      var footerHeight = parseFloat(window.footer.css('height'));
      footer.mouseenter(function () { window.footer.animate({height: '' + (footerHeight*3) +'px'}, 'fast'); });
      footer.mouseleave(function () { window.footer.animate({height: '' + footerHeight + 'px'}, 'fast'); });
  });