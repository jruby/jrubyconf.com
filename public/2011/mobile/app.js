window.JRC = {};

$.jQTouch({
    icon           : 'icon.png',
    addGlossToIcon : false,
    statusBar      : 'black',
    startupScreen  : 'startup.jpg'
});

$.fn.matchViewportHeight = function() {
  return this.each(function() {
    $(this).css('height', JRC.window.height());
  });
};

$(function(){
  JRC.html   = $('html');
  JRC.window = $(window);
  JRC.body   = $('body');
  JRC.sights = $('#sights');

  JRC.body.bind('turn', function(event, info){
    JRC.html.attr('class', info.orientation);
    JRC.sights.find('.sight').matchViewportHeight();
  });

  $('#sights ul a').bind('tap', function(e){
    e.preventDefault();
    var $target  = $($(this).attr('href'))
    ,   viewport = { width: JRC.window.width(), height: JRC.window.height() }
    ;

    JRC.body.addClass('animating');

    $target
      .css({top: viewport.height, height: viewport.height})
      .addClass('current')
      .animate({
        top: 0
      }, 250, function() {
        JRC.sights.removeClass('current');
        JRC.body.removeClass('animating');
      });
    return false;
  });

  $('#jqt .sight .back_to_sights').bind('tap', function(e){
    e.preventDefault();
    var $target  = $($(this).closest('.sight'));

    JRC.body.addClass('animating');
    JRC.sights.addClass('current');

    $target.animate({
        top: JRC.window.height()
      }, 250, function() {
        JRC.body.removeClass('animating');
        $target.removeClass('current');
      });
    return false;
  });
});
