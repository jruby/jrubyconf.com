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
  window.mainNavController     = new NavigationController();
  window.speakersNavController = new NavigationController();
  
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
      self.heading = self.container.find('.heading');
      self.content = self.container.find('.content');

      // CSS animation states
      self.heading.data('animation-visible-css', { opacity: 1.0, top: self.heading.css('top') })
                  .data('animation-hidden-css',  { opacity: 0.0, top: '0px' });
      self.content.data('animation-visible-css', { opacity: 1.0, top: self.content.css('top') })
                  .data('animation-hidden-css',  { opacity: 0.0, top: '0px' });

     // Animation Events
      self.bind('inAnimationWillBegin', function(next) {
            self.heading.css(self.heading.data('animation-hidden-css'));
            self.content.css(self.content.data('animation-hidden-css'));
            if(next) { next(); }
          })
          .bind('inAnimationDidFinish',  function(next) { if(next) { next(); } })
          .bind('outAnimationWillBegin', function(next) { if(next) { next(); } })
          .bind('outAnimationDidFinish', function(next) { if(next) { next(); } });

      // Animations
      self.inAnimation = function() {
        self.registerForInAnimation([
          { element      : self.heading,
            animateToCSS : self.heading.data('animation-visible-css'),
          },
          { element      : self.content,
            animateToCSS : self.content.data('animation-visible-css'),
          }
        ]);
      };

      self.outAnimation = function() {
        self.registerForOutAnimation([
          { element      : self.heading,
            animateToCSS : self.heading.data('animation-hidden-css')
          },
          { element      : self.content,
            animateToCSS : self.content.data('animation-hidden-css')
          }
        ]);
      };
    }
  });


  window.indexScene = new Scene({
    container  : '#index',
    controller : mainNavController,
    init       : function() {
      var self = this;

      // Elements
      self.content = self.container.find('.content');

      // CSS animation states
      self.content.data('animation-visible-css', { opacity: 1.0 })
                  .data('animation-hidden-css',  { opacity: 0.0 });

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


  window.speakersScene = new Scene({
    container  : '#speakers',
    controller : mainNavController,
    init       : function() {
      var self = this;

      // Elements
      self.navigation = self.container.find('.navigation');

      // CSS animation states
      self.navigation.data('animation-visible-css', { opacity: 1.0, top: self.navigation.css('top') })
                     .data('animation-hidden-css',  { opacity: 0.0, top: '0px' });

      // Animation Events
      self.bind('inAnimationWillBegin', function(next) {
            self.navigation.css(self.navigation.data('animation-hidden-css'));
            if(next) { next(); }
          })
          .bind('inAnimationDidFinish',  function(next) {
            self.container.find('.navigation a:first').click();
            if(next) { next(); }
          })
          .bind('outAnimationWillBegin', function(next) {
            speakersSectionScene.trigger('outAnimation');
            scheduleSectionScene.trigger('outAnimation')
            if(next) { next(); }
          })
          .bind('outAnimationDidFinish', function(next) { if(next) { next(); } });

      // Animations
      self.inAnimation = function() {
        self.registerForInAnimation([
          { element      : self.navigation,
            animateToCSS : self.navigation.data('animation-visible-css')
          }
        ]);
      };

      self.outAnimation = function() {
        self.registerForOutAnimation([
          { element      : self.navigation,
            animateToCSS : self.navigation.data('animation-hidden-css')
          }
        ]);
      };
    }
  });


  window.speakersSectionScene = new Scene({
    container  : '#speakers_section',
    controller : speakersNavController,
    init       : function() {
      var self = this;

      // Elements
      self.heading = self.container.find('.heading');
      self.content = self.container.find('.content');      

      // CSS animation states
      self.heading.data('animation-visible-css', { opacity: 1.0, top: self.heading.css('top') })
                  .data('animation-hidden-css',  { opacity: 0.0, top: '0px' });
      self.content.data('animation-visible-css', { opacity: 1.0, top: self.content.css('top') })
                  .data('animation-hidden-css',  { opacity: 0.0, top: '0px' });

      // Animation Events
      self.bind('inAnimationWillBegin', function(next) {
            self.heading.css(self.heading.data('animation-hidden-css'));
            self.content.css(self.content.data('animation-hidden-css'));
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
          { element      : self.content,
            animateToCSS : self.content.data('animation-visible-css')
          }
        ]);
      };

      self.outAnimation = function() {
        self.registerForOutAnimation([
          { element      : self.heading,
            animateToCSS : self.heading.data('animation-hidden-css')
          },
          { element      : self.content,
            animateToCSS : self.content.data('animation-hidden-css')
          }
        ]);
      };
    }
  });
  
  
  window.scheduleSectionScene = new Scene({
    container  : '#schedule_section',
    controller : speakersNavController,
    init       : function() {
      var self = this;

      // Elements
      self.heading = self.container.find('.heading');
      self.content = self.container.find('.content');

      // CSS animation states
      self.heading.data('animation-visible-css', { opacity: 1.0, top: self.heading.css('top') })
                  .data('animation-hidden-css',  { opacity: 0.0, top: '0px' });
      self.content.data('animation-visible-css', { opacity: 1.0, top: self.content.css('top') })
                  .data('animation-hidden-css',  { opacity: 0.0, top: '0px' });

      // Animation Events
      self.bind('inAnimationWillBegin', function(next) {
            self.heading.css(self.heading.data('animation-hidden-css'));
            self.content.css(self.content.data('animation-hidden-css'));
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
          { element      : self.content,
            animateToCSS : self.content.data('animation-visible-css')
          }
        ]);
      };

      self.outAnimation = function() {
        self.registerForOutAnimation([
          { element      : self.heading,
            animateToCSS : self.heading.data('animation-hidden-css')
          },
          { element      : self.content,
            animateToCSS : self.content.data('animation-hidden-css')
          }
        ]);
      };
    }
  });


  setTimeout(function() {
    $.history.init(function(hash){
      var sceneName;

      if(hash) {
        //Strip off front hash and slashses as well as trailing slash
        hash = hash.replace(new RegExp("^[#/]+|/$", "g"), "")
        var scenes = hash.split('/');
        if(scenes.length > 1) {
          var sceneName = (hash == '' ? 'index' : hash);
          window[scenes[0]].find('#'+scenes[1]).show();
          mainNavController.performSegueTo(window[sceneName + 'Scene']);
        } else {
          var sceneName = (hash == '' ? 'index' : hash);
          mainNavController.performSegueTo(window[sceneName + 'Scene']);
        }
        return;
      } else {
        sceneName = 'index';
        mainNavController.performSegueTo(window[sceneName + 'Scene']);
      }

      $('#container .scene:visible .navigation')
        .find('a').removeClass('active').end()
        .find('[href=#' + hash + ']').addClass('active');
    }, { unescape: ',/' });
  }, 350);
});
