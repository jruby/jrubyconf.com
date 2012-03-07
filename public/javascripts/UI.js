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
          .bind('inAnimationDidFinish',  function(next) {
		  if(next) { next(); }
		})
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
      self.infoBox      = {};
      self.closeButtons = self.container.find('.info_box .close');
      self.proposalsLink = $('#proposals_link');

      // CSS animation states
      self.content.data('animation-visible-css', { opacity: 1.0, left: '50%' })
                  .data('animation-hidden-css',  { opacity: 0.0, left: '100%' });

      self.speakers.data('animation-visible-css', { opacity: 1.0 })
                  .data('animation-hidden-css',  { opacity: 0.0 });

      self.scheduleLink.data('animation-visible-css', { opacity: 1.0, right: self.scheduleLink.css('right') })
                       .data('animation-hidden-css',  { opacity: 0.0, right: '-150px' });

      // need to calculate proposals link dynamically based on viewport
      self.setupProposalsLink = function() {
        self.proposalsLink.css('top', "" + ($(window).height() - 70 - 57) + "px");
        self.proposalsLink.data('animation-visible-css', { opacity: 1.0, top: self.proposalsLink.css('top') })
                          .data('animation-hidden-css',  { opacity: 0.0, top: "" + $(window).height() + "px" });
      };
      self.setupProposalsLink();
      $(window).resize(self.setupProposalsLink);

      self.infoBox.animationVisibleCSS = { opacity: 1.0, top: '80px' };
      self.infoBox.animationHiddenCSS  = { opacity: 0.0, top: '-200px' };
      self.infoBox.hideAll             = function(hollaback) {
        $('.info_box:visible').animate(self.infoBox.animationHiddenCSS, 250, 'easeInOutExpo', function() {
          $(this).hide();
          if(hollaback) { hollaback(); }
        });
      };

      // Animation Events
      self.bind('inAnimationWillBegin', function(next) {
            self.content.css(self.content.data('animation-hidden-css'));
            self.scheduleLink.css(self.scheduleLink.data('animation-hidden-css'));
            self.proposalsLink.css(self.proposalsLink.data('animation-hidden-css'));
            if(next) { next(); }
          })
          .bind('inAnimationDidFinish',  function(next) { if(next) { next(); } })
          .bind('outAnimationWillBegin', function(next) { if(next) { next(); } })
          .bind('outAnimationDidFinish', function(next) { if(next) { next(); } });

      // Animations
      self.container.on('click', function(e) {
        var target = $(e.target);
        var targetIsSpeakerOrBio = (!!target.closest('.speaker').length) || (!!target.closest('.info_box').length);
        if(targetIsSpeakerOrBio) { return; }
        self.infoBox.hideAll();
      });

      self.closeButtons.on('click', function(e) { self.infoBox.hideAll(); });

      self.speakers.on('click', 'img, .name, .title', function(e) {
        var targetID  = '#' + $(this).closest('.speaker').attr('id') + '_bio';
        var animateIn = function() {
          $(targetID).css(self.infoBox.animationHiddenCSS)
                     .show()
                     .animate(self.infoBox.animationVisibleCSS, 250, 'easeInOutExpo');
        };

        if($('.info_box:visible').length) {
          self.infoBox.hideAll(animateIn);
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
          },
          { element      : self.proposalsLink,
            animateToCSS : self.proposalsLink.data('animation-visible-css'),
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
          },
          { element      : self.proposalsLink,
            animateToCSS : self.proposalsLink.data('animation-hidden-css')
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
      self.content      = self.container.find('.content');
      self.events       = self.container.find('tr');
      self.infoBox      = {};
      self.closeButtons = self.container.find('.info_box .close');
      self.speakersLink = $('#speakers_link');

      // CSS animation states
      self.heading.data('animation-visible-css', { opacity: 1.0, top: self.heading.css('top') })
                  .data('animation-hidden-css',  { opacity: 0.0, top: '0px' });

      self.content.data('animation-visible-css', { opacity: 1.0, left: '50%' })
                  .data('animation-hidden-css',  { opacity: 0.0, left: '-100%' });

      self.speakersLink.data('animation-visible-css', { opacity: 1.0, left: self.speakersLink.css('left') })
                       .data('animation-hidden-css',  { opacity: 0.0, left: '-150px' });

      self.infoBox.animationVisibleCSS = { opacity: 1.0, top: '80px' };
      self.infoBox.animationHiddenCSS  = { opacity: 0.0, top: '-200px' };
      self.infoBox.hideAll             = function(hollaback) {
       $('.info_box:visible').animate(self.infoBox.animationHiddenCSS, 250, 'easeInOutExpo', function() {
         $(this).hide();
         if(hollaback) { hollaback(); }
       });
      };
      // Animation Events
      self.bind('inAnimationWillBegin', function(next) {
            self.heading.css(self.heading.data('animation-hidden-css'));
            self.content.css(self.content.data('animation-hidden-css'));
            self.speakersLink.css(self.speakersLink.data('animation-hidden-css'));
            if(next) { next(); }
          })
          .bind('inAnimationDidFinish',  function(next) { if(next) { next(); } })
          .bind('outAnimationWillBegin', function(next) { if(next) { next(); } })
          .bind('outAnimationDidFinish', function(next) { if(next) { next(); } });

      // Animations
      self.container.on('click', function(e) {
        var target = $(e.target);
        var targetIsEventOrBio = (!!target.closest('tr').length) || (!!target.closest('.info_box').length);
        if(targetIsEventOrBio) { return; }
        self.infoBox.hideAll();
      });

      self.closeButtons.on('click', function(e) { self.infoBox.hideAll(); });

      self.events.on('click', function(e) {
        var targetID  = '#' + $(this).attr('data-id');
        var animateIn = function() {
          $(targetID).css(self.infoBox.animationHiddenCSS)
                     .show()
                     .animate(self.infoBox.animationVisibleCSS, 250, 'easeInOutExpo');
        };

        if($('.info_box:visible').length) {
          self.infoBox.hideAll(animateIn);
        } else {
          animateIn();
        }
      });

      self.inAnimation = function() {
        self.registerForInAnimation([
          { element      : self.heading,
            animateToCSS : self.heading.data('animation-visible-css')
          },
          { element      : self.content,
            animateToCSS : self.content.data('animation-visible-css')
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
          { element      : self.content,
            animateToCSS : self.content.data('animation-hidden-css')
          },
          { element      : self.speakersLink,
            animateToCSS : self.speakersLink.data('animation-hidden-css')
          }
        ]);
      };
    }
  });

  window.proposalsScene = new Scene({
    container  : '#proposals',
    controller : sceneController,
    init       : function() {
      var self = this;

      self.content      = self.container.find('.content');
      self.speakersLink = $('#speakers_link');

      // CSS animation states
      self.content.data('animation-visible-css', { opacity: 1.0, top: self.content.css('top') })
                  .data('animation-hidden-css',  { opacity: 0.0, top: '0px' });

      self.speakersLink.data('animation-visible-css', { opacity: 1.0, left: self.speakersLink.css('left') })
                       .data('animation-hidden-css',  { opacity: 0.0, left: '-150px' });

      // Animation Events
      self.bind('inAnimationWillBegin', function(next) {
            self.content.css(self.content.data('animation-hidden-css'));
            self.speakersLink.css(self.speakersLink.data('animation-hidden-css'));
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
          { element      : self.speakersLink,
            animateToCSS : self.speakersLink.data('animation-visible-css')
          }
        ]);
      };

      self.outAnimation = function() {
        self.registerForOutAnimation([
          { element      : self.content,
            animateToCSS : self.content.data('animation-hidden-css')
          },
          { element      : self.speakersLink,
            animateToCSS : self.speakersLink.data('animation-hidden-css')
          }
        ]);
      };
    }
  });

  window.sponsorsScene = new Scene({
      container  : '#sponsors',
      controller : sceneController,
      init       : function() {
	  var self = this;

	  self.content = self.container.find('.content');
	  self.footer = $('#footer');
	  self.prospectusLink = $('#prospectus_link');

	  self.content.data('animation-visible-css', { opacity: 1.0 })
              .data('animation-hidden-css',  { opacity: 0.0 });
	  self.footer.data('animation-visible-css', { opacity: 1.0 })
              .data('animation-hidden-css',  { opacity: 0.0 });
	  self.prospectusLink.data('animation-visible-css', { opacity: 1.0, left: self.prospectusLink.css('left') })
              .data('animation-hidden-css',  { opacity: 0.0, left: '-225px' });

	  // set up sponsor levels
	  var levels = $('#sponsors .level').map(
	      function() {
		  return $.makeArray(this.classList);
	      }).map(
	      function() {
		  return (this=="level") ? null : this;
	      });

	  self.footerElements = [];
	  self.sceneElements = [];
	  self.transitionElements = [];

	  levels.each(
	      function() {
		  var numElems = 0, levelDiv = self.content.find('.' + this);
		  levelDiv.append(self.footer.find('.' + this).each(
		      function() {
			  self.footerElements.push(this);
		      }
		  ).clone().each(
		      function() {
			  self.sceneElements.push(this);
			  $(this).clone().each(
			      function() {
				  $(this).removeClass().addClass('arc');
				  self.transitionElements.push(this);
				  self.container.append($(this).hide());
			      }
			  );
			  numElems += 1;
		      }
		  ));
		  if (numElems > 0) {
		      levelDiv.show();
		  }
	      });

	  // Animation Events
	  self.bind('inAnimationWillBegin', function(next) {
			self.content.css(self.content.data('animation-hidden-css'));
			self.prospectusLink.css(self.prospectusLink.data('animation-hidden-css'));
			if(next) { next(); }
		    })
              .bind('inAnimationDidFinish',  function(next) {
			$(self.transitionElements).hide();
			if(next) { next(); } })
              .bind('outAnimationWillBegin', function(next) { if(next) { next(); } })
              .bind('outAnimationDidFinish', function(next) {
			$(self.transitionElements).hide();
			if(next) { next(); } });

	  // Animations
	  self.inAnimation = function() {
	      var elements = [
		  { element      : self.prospectusLink,
		    animateToCSS : self.prospectusLink.data('animation-visible-css')
		  }
	      ];
	      var delay = 0;
	      $(self.transitionElements).each(
	      	  function(idx) {
	      	      var startOffset = $(self.footerElements[idx]).offset(),
	      		  endOffset = $(self.sceneElements[idx]).offset();
	      	      $(this).css({left: startOffset.left, top: startOffset.top}).show();
		      var direction = Math.random() > 0.5 ? 1 : -1;
	      	      var bezier = new $.path.bezier({
	      						 start: {x:startOffset.left, y:startOffset.top, angle: 40 * direction, length: 0.3},
	      						 end:   {x:endOffset.left, y:endOffset.top, angle: -40 * direction, length: 0.2}
	      					 });
		      elements.push({
					element: $(self.footerElements[idx]),
					animateToCSS: {opacity: 0},
					delay: delay
				    });
	      	      elements.push({
	      				element: $(this),
	      				animateToCSS: {path: bezier},
					delay: delay
	      			    });
		      delay += 200;
	      	  }
	      );
	      elements.push({
		  element      : self.content,
		  animateToCSS : self.content.data('animation-visible-css'),
		  delay        : delay
	      });
	      elements.push({
		  element : self.footer,
		  animateToCSS : self.content.data('animation-hidden-css'),
		  delay : delay
	      });
              self.registerForInAnimation(elements);
	  };

	  self.outAnimation = function() {
	      var elements = [
		  { element      : self.content,
		    animateToCSS : self.content.data('animation-hidden-css'),
		    duration: 100
		  },
		  { element : self.footer,
		    animateToCSS : self.content.data('animation-visible-css')
		  },
		  { element      : self.prospectusLink,
		    animateToCSS : self.prospectusLink.data('animation-hidden-css')
		  }
	      ];
	      $(self.transitionElements).each(
	      	  function(idx) {
	      	      var startOffset = $(self.sceneElements[idx]).offset(),
	      		  endOffset = $(self.footerElements[idx]).offset();
	      	      $(this).css({left: startOffset.left, top: startOffset.top}).show();
		      var direction = Math.random() > 0.5 ? 1 : -1;
	      	      var bezier = new $.path.bezier({
	      						 start: {x:startOffset.left, y:startOffset.top, angle: -40*direction, length: 0.2},
	      						 end:   {x:endOffset.left, y:endOffset.top, angle: 40*direction, length: 0.3}
	      					 });
		      elements.push({
					element: $(self.footerElements[idx]),
					animateToCSS: {opacity: 1}
				    });
	      	      elements.push({
	      				element: $(this),
	      				animateToCSS: {path: bezier}
	      			    });
	      	  }
	      );
              self.registerForOutAnimation(elements);
	  };
	  self.content.css(self.content.data('animation-hidden-css'));
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
