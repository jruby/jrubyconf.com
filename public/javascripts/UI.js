/* EXAMPLE SCENE:
window.exampleScene = new Scene('#example', function() {
  var self = this;

  // Elements
  self.element = self.container.find('.element');

  // CSS animation states
  self.element.data('animation-visible-css', { })
              .data('animation-hidden-css',  { });

  // Animation Events
  self.bind('inAnimationWillBegin',  function(next) { if(next) { next(); } })
      .bind('inAnimationDidFinish',  function(next) { if(next) { next(); } })
      .bind('outAnimationWillBegin', function(next) { if(next) { next(); } })
      .bind('outAnimationDidFinish', function(next) { if(next) { next(); } });

  // Animations
  self.inAnimation = function() {
    self.registerForInAnimation([
      { element : self.element,
        css     : self.element.data('animation-visible-css');
      }
    ]);
  };

  self.outAnimation = function() {
    self.registerForOutAnimation([
      { element : self.element,
        css     : self.element.data('animation-hidden-css');
      }
    ]);
  };
});
*/

$(function() {
  window.mainNavController = new NavigationController();
  
  $('#speakers .navigation').on('click', 'a', function(e) {
    e.preventDefault();
    var sceneName = $(this).attr('href')
                           .replace('_section', 'SectionScene')
                           .replace('#', '');

    speakersNavController.performSegueTo(window[sceneName]);
  });

  window.informationScene = new Scene({
    container  : '#information',
    controller : mainNavController,
    init       : function() {
      var self = this;

      // Elements
      self.content = self.container.find('.content');

      // CSS animation states
      self.content.data('animation-visible-css', { opacity: 1.0, top: self.content.css('top') })
                  .data('animation-hidden-css',  { opacity: 0.0, top: '0px' });

     // Animation Events
      self.bind('inAnimationWillBegin', function(next) {
            self.content.css(self.content.data('animation-hidden-css'));
            if(next) { next(); }
          })
          .bind('inAnimationDidFinish',  function(next) { if(next) { next(); } })
          .bind('outAnimationWillBegin', function(next) { if(next) { next(); } })
          .bind('outAnimationDidFinish', function(next) { if(next) { next(); } });

      // Animations
      self.inAnimation = function() {
        self.registerForInAnimation([
          { element      : self.content,
            animateToCSS : self.content.data('animation-visible-css'),
          }
        ]);
      };

      self.outAnimation = function() {
        self.registerForOutAnimation([
          { element      : self.content,
            animateToCSS : self.content.data('animation-hidden-css')
          }
        ]);
      };
    }
  });


  window.introScene = new Scene({
    container  : '#intro',
    controller : mainNavController,
    init       : function() {
      var self = this;

      // Elements
      self.content = self.container.find('.content');
      window.mainNavigation = $('#main_navigation');

      // CSS animation states
      self.content.data('animation-visible-css', { opacity: 1.0 })
                  .data('animation-hidden-css',  { opacity: 0.0 });

      window.mainNavigation.data('animation-visible-css', { opacity: 1.0, top: window.mainNavigation.css('top') })
                           .data('animation-hidden-css',  { opacity: 0.0, top: '-50px' });

      // Animation Events
      self.bind('inAnimationWillBegin', function(next) {
            self.content.css(self.content.data('animation-hidden-css'));
            if(next) { next(); }
          })
          .bind('inAnimationDidFinish',  function(next) { if(next) { next(); } })
          .bind('outAnimationWillBegin', function(next) { if(next) { next(); } })
          .bind('outAnimationDidFinish', function(next) { if(next) { next(); } });

      // Animations
      self.inAnimation = function() {
        self.registerForInAnimation([
          { element      : self.content,
            animateToCSS : self.content.data('animation-visible-css')
          },
          { element      : window.mainNavigation,
            animateToCSS : window.mainNavigation.data('animation-hidden-css'),
            duration     : 100
          }
        ]);
      };

      self.outAnimation = function() {
        self.registerForOutAnimation([
          { element      : self.content,
            animateToCSS : self.content.data('animation-hidden-css')
          },
          { element      : window.mainNavigation,
            animateToCSS : window.mainNavigation.data('animation-visible-css')
          }
        ]);
      };
    }
  });


  window.speakersScene = new Scene({
    container  : '#speakers',
    controller : mainNavController,
    init       : function() {
      var self = this;

      // Elements
      self.heading      = self.container.find('.heading');
      self.listing      = $('#speakers_listing');
      self.scheduleLink = $('#schedule_link');

      // CSS animation states
      self.heading.data('animation-visible-css', { opacity: 1.0, top: self.heading.css('top') })
                  .data('animation-hidden-css',  { opacity: 0.0, top: '0px' });
                  
      self.listing.data('animation-visible-css', { opacity: 1.0 })
                  .data('animation-hidden-css',  { opacity: 0.0 });
                  
      self.scheduleLink.data('animation-visible-css', { opacity: 1.0, right: self.scheduleLink.css('right') })
                       .data('animation-hidden-css',  { opacity: 0.0, right: '-50px' });

      // Animation Events
      self.bind('inAnimationWillBegin', function(next) {
            self.heading.css(self.heading.data('animation-hidden-css'));
            self.listing.css(self.heading.data('animation-hidden-css'));
            self.scheduleLink.css(self.scheduleLink.data('animation-hidden-css'));
            if(next) { next(); }
          })
          .bind('inAnimationDidFinish',  function(next) { if(next) { next(); } })
          .bind('outAnimationWillBegin', function(next) { if(next) { next(); } })
          .bind('outAnimationDidFinish', function(next) { if(next) { next(); } });

      // Animations
      self.inAnimation = function() {
        self.registerForInAnimation([
          { element      : self.heading,
            animateToCSS : self.heading.data('animation-visible-css')
          },
          { element      : self.listing,
            animateToCSS : self.listing.data('animation-visible-css')
          },
          { element      : self.scheduleLink,
            animateToCSS : self.scheduleLink.data('animation-visible-css'),
            delay        : 500,
            duration     : 300
          }
        ]);
      };

      self.outAnimation = function() {
        self.registerForOutAnimation([
          { element      : self.heading,
            animateToCSS : self.heading.data('animation-hidden-css')
          },
          { element      : self.listing,
            animateToCSS : self.listing.data('animation-hidden-css')
          },
          { element      : self.scheduleLink,
            animateToCSS : self.scheduleLink.data('animation-hidden-css')
          }
        ]);
      };
    }
  });
  
  
  window.scheduleScene = new Scene({
    container  : '#schedule',
    controller : mainNavController,
    init       : function() {
      var self = this;

      // Elements
      self.heading      = self.container.find('.heading');
      self.speakersLink = $('#speakers_link');

      // CSS animation states
      self.heading.data('animation-visible-css', { opacity: 1.0, top: self.heading.css('top') })
                  .data('animation-hidden-css',  { opacity: 0.0, top: '0px' });
                  
      self.speakersLink.data('animation-visible-css', { opacity: 1.0, left: self.speakersLink.css('left') })
                       .data('animation-hidden-css',  { opacity: 0.0, left: '-50px' });

      // Animation Events
      self.bind('inAnimationWillBegin', function(next) {
            self.heading.css(self.heading.data('animation-hidden-css'));
            self.speakersLink.css(self.heading.data('animation-hidden-css'));
            if(next) { next(); }
          })
          .bind('inAnimationDidFinish',  function(next) { if(next) { next(); } })
          .bind('outAnimationWillBegin', function(next) { if(next) { next(); } })
          .bind('outAnimationDidFinish', function(next) { if(next) { next(); } });

      // Animations
      self.inAnimation = function() {
        self.registerForInAnimation([
          { element      : self.heading,
            animateToCSS : self.heading.data('animation-visible-css')
          },
          { element      : self.speakersLink,
            animateToCSS : self.speakersLink.data('animation-visible-css')
          }
        ]);
      };

      self.outAnimation = function() {
        self.registerForOutAnimation([
          { element      : self.heading,
            animateToCSS : self.heading.data('animation-hidden-css')
          },
          { element      : self.speakersLink,
            animateToCSS : self.speakersLink.data('animation-hidden-css')
          }
        ]);
      };
    }
  });


  setTimeout(function() {
    $.history.init(function(hash){
      hash = (hash == '' ? 'intro' : hash.replace(new RegExp("^[#/]+|/$", "g"), ''));
      var target = window[hash + 'Scene'];
      mainNavController.performSegueTo((target ? target : window['introScene']));
    }, { unescape: ',/' });
  }, 350);
});