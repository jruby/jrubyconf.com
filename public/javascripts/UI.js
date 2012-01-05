/*
window.exampleScene = new Scene({
  container  : '#example',
  controller : exampleController,
  init       : function() {
    var self = this;

    // Elements
    self.content = self.container.find('.content');

    // CSS animation states
    self.content.data('animation-visible-css', { opacity: 1.0, top: self.content.css('top') })
                .data('animation-hidden-css',  { opacity: 0.0, top: '0px' });

   // Animation Events
    self.bind('inAnimationWillBegin',  function(next) { if(next) { next(); } })
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
*/



$(function() {
  window.sceneController = new ScenesController();
  
  $('#speakers .navigation').on('click', 'a', function(e) {
    e.preventDefault();
    var sceneName = $(this).attr('href')
                           .replace('_section', 'SectionScene')
                           .replace('#', '');

    speakersNavController.performSegueTo(window[sceneName]);
  });

  window.informationScene = new Scene({
    container  : '#information',
    controller : sceneController,
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
    controller : sceneController,
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
    controller : sceneController,
    init       : function() {
      var self = this;

      // Elements
      self.content      = self.container.find('.content');
      self.scheduleLink = $('#schedule_link');
      self.speakers     = self.container.find('.speaker');
      self.bioBox       = {};
      self.closeButtons = self.container.find('.bio_box .close');

      // CSS animation states
      self.content.data('animation-visible-css', { opacity: 1.0, left: self.content.css('left') })
                  .data('animation-hidden-css',  { opacity: 0.0, left: '100%' });
                  
      self.speakers.data('animation-visible-css', { opacity: 1.0 })
                  .data('animation-hidden-css',  { opacity: 0.0 });
                  
      self.scheduleLink.data('animation-visible-css', { opacity: 1.0, right: self.scheduleLink.css('right') })
                       .data('animation-hidden-css',  { opacity: 0.0, right: '-50px' });
                       
      self.bioBox.animationVisibleCSS = { opacity: 1.0, top: '80px' };
      self.bioBox.animationHiddenCSS  = { opacity: 0.0, top: '-200px' };
      self.bioBox.hideAll             = function(hollaback) {
        $('.bio_box:visible').animate(self.bioBox.animationHiddenCSS, 250, 'easeInOutExpo', function() {
          $(this).hide();
          if(hollaback) { hollaback(); }
        });
      }

      // Animation Events
      self.bind('inAnimationWillBegin', function(next) {
            self.content.css(self.content.data('animation-hidden-css'));
            self.scheduleLink.css(self.scheduleLink.data('animation-hidden-css'));
            if(next) { next(); }
          })
          .bind('inAnimationDidFinish',  function(next) { if(next) { next(); } })
          .bind('outAnimationWillBegin', function(next) { if(next) { next(); } })
          .bind('outAnimationDidFinish', function(next) { if(next) { next(); } });

      // Animations
      $('body').on('click', function(e) {
        var target = $(e.target);
        var targetIsSpeakerOrBio = (!!target.closest('.speaker').length) || (!!target.closest('.bio_box').length);
        if(targetIsSpeakerOrBio) { return; }
        self.bioBox.hideAll();
      });

      self.closeButtons.on('click', function(e) { self.bioBox.hideAll(); });
      
      self.speakers.on('click', 'img, .name, .title', function(e) {
        var targetID  = '#' + $(this).closest('.speaker').attr('id') + '_bio';
        var animateIn = function() {
          $(targetID).css(self.bioBox.animationHiddenCSS)
                     .show()
                     .animate(self.bioBox.animationVisibleCSS, 250, 'easeInOutExpo'); 
        };

        if($('.bio_box:visible').length) {
          self.bioBox.hideAll(animateIn);
        } else {
          animateIn();
        }
      });

      self.inAnimation = function() {
        self.registerForInAnimation([
          { element      : self.content,
            animateToCSS : self.content.data('animation-visible-css')
          },
          { element      : self.scheduleLink,
            animateToCSS : self.scheduleLink.data('animation-visible-css'),
            duration     : 300,
            delay        : 400
          }
        ]);
      };

      self.outAnimation = function() {
        self.registerForOutAnimation([
          { element      : self.content,
            animateToCSS : self.content.data('animation-hidden-css')
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
    controller : sceneController,
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
            self.speakersLink.css(self.speakersLink.data('animation-hidden-css'));
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
      sceneController.performSegueTo((target ? target : window['introScene']));
    }, { unescape: ',/' });
  }, 350);
});