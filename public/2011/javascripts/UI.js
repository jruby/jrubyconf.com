/*
 * jQuery history plugin
 *
 * The MIT License
 *
 * Copyright (c) 2006-2009 Taku Sano (Mikage Sawatari)
 * Copyright (c) 2010 Takayuki Miwa
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function($) {
    var locationWrapper = {
        put: function(hash, win) {
            (win || window).location.hash = this.encoder(hash);
        },
        get: function(win) {
            var hash = ((win || window).location.hash).replace(/^#/, '');
            try {
                return $.browser.mozilla ? hash : decodeURIComponent(hash);
            }
            catch (error) {
                return hash;
            }
        },
        encoder: encodeURIComponent
    };

    var iframeWrapper = {
        id: "__jQuery_history",
        init: function() {
            var html = '<iframe id="'+ this.id +'" style="display:none" src="javascript:false;" />';
            $("body").prepend(html);
            return this;
        },
        _document: function() {
            return $("#"+ this.id)[0].contentWindow.document;
        },
        put: function(hash) {
            var doc = this._document();
            doc.open();
            doc.close();
            locationWrapper.put(hash, doc);
        },
        get: function() {
            return locationWrapper.get(this._document());
        }
    };

    function initObjects(options) {
        options = $.extend({
                unescape: false
            }, options || {});

        locationWrapper.encoder = encoder(options.unescape);

        function encoder(unescape_) {
            if(unescape_ === true) {
                return function(hash){ return hash; };
            }
            if(typeof unescape_ == "string" &&
               (unescape_ = partialDecoder(unescape_.split("")))
               || typeof unescape_ == "function") {
                return function(hash) { return unescape_(encodeURIComponent(hash)); };
            }
            return encodeURIComponent;
        }

        function partialDecoder(chars) {
            var re = new RegExp($.map(chars, encodeURIComponent).join("|"), "ig");
            return function(enc) { return enc.replace(re, decodeURIComponent); };
        }
    }

    var implementations = {};

    implementations.base = {
        callback: undefined,
        type: undefined,

        check: function() {},
        load:  function(hash) {},
        init:  function(callback, options) {
            initObjects(options);
            self.callback = callback;
            self._options = options;
            self._init();
        },

        _init: function() {},
        _options: {}
    };

    implementations.timer = {
        _appState: undefined,
        _init: function() {
            var current_hash = locationWrapper.get();
            self._appState = current_hash;
            self.callback(current_hash);
            setInterval(self.check, 100);
        },
        check: function() {
            var current_hash = locationWrapper.get();
            if(current_hash != self._appState) {
                self._appState = current_hash;
                self.callback(current_hash);
            }
        },
        load: function(hash) {
            if(hash != self._appState) {
                locationWrapper.put(hash);
                self._appState = hash;
                self.callback(hash);
            }
        }
    };

    implementations.iframeTimer = {
        _appState: undefined,
        _init: function() {
            var current_hash = locationWrapper.get();
            self._appState = current_hash;
            iframeWrapper.init().put(current_hash);
            self.callback(current_hash);
            setInterval(self.check, 100);
        },
        check: function() {
            var iframe_hash = iframeWrapper.get(),
                location_hash = locationWrapper.get();

            if (location_hash != iframe_hash) {
                if (location_hash == self._appState) {    // user used Back or Forward button
                    self._appState = iframe_hash;
                    locationWrapper.put(iframe_hash);
                    self.callback(iframe_hash); 
                } else {                              // user loaded new bookmark
                    self._appState = location_hash;  
                    iframeWrapper.put(location_hash);
                    self.callback(location_hash);
                }
            }
        },
        load: function(hash) {
            if(hash != self._appState) {
                locationWrapper.put(hash);
                iframeWrapper.put(hash);
                self._appState = hash;
                self.callback(hash);
            }
        }
    };

    implementations.hashchangeEvent = {
        _init: function() {
            self.callback(locationWrapper.get());
            $(window).bind('hashchange', self.check);
        },
        check: function() {
            self.callback(locationWrapper.get());
        },
        load: function(hash) {
            locationWrapper.put(hash);
        }
    };

    var self = $.extend({}, implementations.base);

    if($.browser.msie && ($.browser.version < 8 || document.documentMode < 8)) {
        self.type = 'iframeTimer';
    } else if("onhashchange" in window) {
        self.type = 'hashchangeEvent';
    } else {
        self.type = 'timer';
    }

    $.extend(self, implementations[self.type]);
    $.history = self;
})(jQuery); // HISTORY


function globalEvent(eventName) { $('body').trigger(eventName); }

$.extend($.easing,{
  easeInOutExpo: function (x, t, b, c, d) {
    if (t==0) return b;
    if (t==d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  }
});

$.fn.extend({
  inlineLabel: function(){
    return this.each(function(){
      var wrapper = $(this);
      var input   = wrapper.find(':input:first');
      var label   = wrapper.find('.inline_example');
      if(!label.length) label = wrapper.find('label:first');

      label.addClass('inline').click(function() { input.focus(); });
      if(input.val()) wrapper.addClass('value_entered');

      input
      .focus(function(){
        wrapper.addClass('entering_text');
      })
      .blur(function(){
        wrapper.removeClass('entering_text');
        if(!input.val()) wrapper.removeClass('value_entered');
      })
      .keypress(function(){
        wrapper.addClass('value_entered');
      })
      .keyup(function(){
        if(!input.val()) wrapper.removeClass('value_entered');
      });
    });
  }
});

var SECTIONS = {
  init: function(section){
    $('#main_nav').hide();
    $('#content').css('overflow', 'hidden');

    $('#dc_map .link').click(function(e){
      e.preventDefault();
      var target = $($(this).attr('href'));

      $('#dc_map .content:not(#' + target.attr('id') + ')').hide();
      target.show();
    });
    $('#dc_map .content').hide();

    this.index.init();
    this.register.init();
    this.info.init();
    this.talks.init();

    $('#content section').hide();
  },

  talks: {
    init: function() {
      var talksSection = $('#talks');

      talksSection.find('.speaker').click(function(e) {
        if($(e.target).hasClass('twitter')) { return; }
        e.preventDefault();

        $('.speaker').css('zIndex', '1').find('.bio').slideUp(100);
        $(this).css('zIndex', '2')
               .find('.bio').stop().slideToggle(100);
      });


      this.schedule.init();
      this.speakers.init();
      this.submitted_talks.init();
      this.submit_talk.init();

      talksSection.find('.bio').hide();
      talksSection.find('.sub_section').hide();

      talksSection
        .bind('outAnimationWillBegin', function() {
          talksSection.addClass('animating');
        })
        .bind('outAnimationDidFinish', function() {
          talksSection.removeClass('animating').hide();
          globalEvent('outAnimationDidFinish');
        })
        .bind('inAnimationWillBegin', function() {
          $('#main_nav').fadeIn(250);
          talksSection.addClass('animating').show();
        })
        .bind('inAnimationDidFinish', function() {
          talksSection.removeClass('animating');
        })
        .bind('subPageOutAnimationWillBegin', function() {
          talksSection.addClass('animating');
        })
        .bind('subPageOutAnimationDidFinish', function(event, callParentEvent) {
          talksSection.removeClass('animating');
          globalEvent('subPageOutAnimationDidFinish');
          if(callParentEvent) { talksSection.trigger('outAnimationDidFinish'); }
        });
    },

    inAnimation: function() {
      var $talksSection    = $('#talks')
      ,   targetSectionID  = 'schedule'
      ,   $navigationLinks = $talksSection.find('nav a')
      ,   complete         = function() { SECTIONS.talks[targetSectionID].inAnimation(); };

      $talksSection.trigger('inAnimationWillBegin');
      $navigationLinks.removeClass('active')
                      .first().addClass('active');

      $navigationLinks
        .css({ top: -15, opacity: 0 })
        .each(function(i, link) {
          var delay = i+1;
          $(link).delay(delay*150).animate({
            top     : 0,
            opacity : 1
          }, 300, 'easeInOutExpo', function() {
            if(i==$navigationLinks.length-1) { complete(); }
          });
        });
    },

    outAnimation: function() {
      var currentSectionID = $('#talks').find('.sub_section:visible').attr('id');
      this[currentSectionID].outAnimation(true);
    },

    schedule: {
      init: function(){
        $('.schedule_days .entry').click(function(e){
          e.preventDefault();
          var more = $(this).find('.more');

          if(more.is(':visible')) {
            $('.schedule_days .entry .more').slideUp(100);
          } else {
            $('.schedule_days .entry .more:visible').slideUp(100);
            more.slideDown(100);
          }

        }).each(function(i, entry){
          var name = $(entry).find('.name').text();
          $(entry).find('.description').before('<div class="name">' + name + '</div>');
        });
      },

      inAnimation: function() {
        var talksSection = $('#talks')
        ,   subSection   = $('#schedule')
        ,   day_1        = $('#day_1')
        ,   day_2        = $('#day_2')
        ,   whisky       = $('#whisky')
        ,   count        = 3
        ,   complete     = function() {
              count--;
              if(count == 0) {
                talksSection.trigger('inAnimationDidFinish');
              }
            };

        talksSection.trigger('inAnimationWillBegin');

        // prepare for animation
        day_1.hide();
        day_2.hide();
        whisky.hide();
        subSection.show();

        // animate
        day_1.fadeIn(300, complete);
        day_2.fadeIn(300, complete);
        whisky.fadeIn(300, complete);
      },

      outAnimation: function(changingMajorPage) {
        var talksSection = $('#talks')
        ,   subSection   = $('#schedule')
        ,   day_1        = $('#day_1')
        ,   day_2        = $('#day_2')
        ,   whisky       = $('#whisky')
        ,   count        = 3
        ,   complete     = function() {
              count--;
              if(count == 0) {
                subSection.hide();
                talksSection.trigger('subPageOutAnimationDidFinish', changingMajorPage);
              }
            };

        talksSection.trigger('subPageOutAnimationWillBegin');

        day_1.fadeIn(300, complete);
        day_2.fadeIn(300, complete);
        whisky.fadeIn(300, complete);
      }
    },

    speakers: {
      init: function(){},

      inAnimation: function() {
        var talksSection = $('#talks')
        ,   subSection   = $('#speakers')
        ,   speakers     = $('#speakers_listing')
        ,   count        = 1
        ,   complete     = function() {
              count--;
              if(count == 0) {
                talksSection.trigger('inAnimationDidFinish');
              }
            };

        talksSection.trigger('inAnimationWillBegin');

        // prepare for animation
        speakers.hide();
        subSection.show();

        // animate
        speakers.fadeIn(300, complete);
      },

      outAnimation: function(changingMajorPage) {
        var talksSection = $('#talks')
        ,   subSection   = $('#speakers')
        ,   speakers     = $('#speakers_listing')
        ,   count        = 1
        ,   complete     = function() {
              count--;
              if(count == 0) {
                subSection.hide();
                talksSection.trigger('subPageOutAnimationDidFinish', changingMajorPage)
              }
            };

        talksSection.trigger('subPageOutAnimationWillBegin');

        speakers.fadeOut(200, complete);
      }
    },

    submitted_talks: {
      init: function() {
      },

      inAnimation: function() {
        var talksSection = $('#talks')
        ,   subSection   = $('#submitted_talks')
        ,   h1           = subSection.find('h1')
        ,   count        = 1
        ,   complete     = function() {
              count--;
              if(count == 0) {
                talksSection.trigger('inAnimationDidFinish');
              }
            };

        talksSection.trigger('inAnimationWillBegin');

        // prepare for animation
        h1.hide();
        subSection.show();

        // animate
        h1.fadeIn(300, complete);
      },

      outAnimation: function(changingMajorPage) {
        var talksSection = $('#talks')
        ,   subSection   = $('#submitted_talks')
        ,   h1           = subSection.find('h1')
        ,   count        = 1
        ,   complete     = function() {
              count--;
              if(count == 0) {
                subSection.hide();
                talksSection.trigger('subPageOutAnimationDidFinish', changingMajorPage)
              }
            };

        talksSection.trigger('subPageOutAnimationWillBegin');

        h1.fadeOut(200, complete);
      }
    },

    submit_talk: {
      init: function() {
        var heading = $('#submit_talks_heading')
        ,   form    = $('#submit_talk_form')
        ,   flash   = $('#flash_message');

        form.find('.inline_label').inlineLabel();

        if(!heading.data('original-style')) { heading.data('original-style',  { css: {opacity: 1, lineHeight:heading.css('lineHeight')}}); }
        if(!form.data('original-style'))    { form.data('original-style',     { css: {opacity: 1, left:parseInt(form.css('left'))}}); }

        flash.hide();

        form.submit(function(e) {
          e.preventDefault();
          form.find('.submit input').attr('disabled', true);

          $.post('/talks', form.serialize(), function(data) {
            form.find('.submit input').attr('disabled', false);
            flash.text(data.flash).fadeIn(200);

            if(data.status == 'success') {
              form.find('input[type=text]').val('').focus().blur().end()
                  .find('textarea').val('').focus().blur();
            }
          });
        });
      },

      inAnimation: function() {
        var talksSection = $('#talks')
        ,   subSection   = $('#submit_talk')
        ,   heading      = $('#submit_talks_heading')
        ,   form         = $('#submit_talk_form')
        ,   count        = 2
        ,   complete     = function() {
              count--;
              if(count == 0) {
                talksSection.trigger('inAnimationDidFinish');
              }
            };

        talksSection.trigger('inAnimationWillBegin');

        // prepare for animation
        heading.show().css({ lineHeight: '65px', opacity: 0 });
        form.show().css({ left: form.data('original-style').css.left+140, opacity: 0 });
        subSection.show();

        // animate
        heading.animate(heading.data('original-style').css, 500, 'easeInOutExpo', complete)
        form.animate(form.data('original-style').css,       300, 'easeInOutExpo', complete);
      },

      outAnimation: function(changingMajorPage) {
        var talksSection = $('#talks')
        ,   subSection   = $('#submit_talk')
        ,   heading      = $('#submit_talks_heading')
        ,   form         = $('#submit_talk_form')
        ,   count        = 2
        ,   complete     = function() {
              count--;
              if(count == 0) {
                subSection.hide();
                talksSection.trigger('subPageOutAnimationDidFinish', changingMajorPage)
              }
            };

        talksSection.trigger('subPageOutAnimationWillBegin');

        heading.animate({
          opacity    : 0,
          lineHeight : '65px'
        }, 300, 'easeInOutExpo', complete);

        form.animate({
          left    : form.data('original-style').css.left+140,
          opacity : 0
        }, 200, 'easeInOutExpo', complete);
      }
    }
  },

  register: {
    init: function() {
      var registerSection = $('#register');

      registerSection
        .bind('outAnimationWillBegin', function() {
          registerSection.addClass('animating');
        })
        .bind('outAnimationDidFinish', function() {
          registerSection.removeClass('animating').hide();
          globalEvent('outAnimationDidFinish');
        })
        .bind('inAnimationWillBegin', function() {
          $('#main_nav').fadeIn(250);
          registerSection.addClass('animating').show();
        })
        .bind('inAnimationDidFinish', function() {
          registerSection.removeClass('animating');
        });

      var heading         = $('#new_deal_header')
      ,   copyBlock       = registerSection.find('.copy_block')
      ,   registerButton  = copyBlock.find('a')

      if(!heading.data('original-style'))        { heading.data('original-style',        { css: {opacity: 1, top:heading.css('top')}}); }
      if(!copyBlock.data('original-style'))      { copyBlock.data('original-style',      { css: {opacity: 1, top:copyBlock.css('top')}}); }
      if(!registerButton.data('original-style')) { registerButton.data('original-style', { css: {opacity: 1, bottom:registerButton.css('bottom')}}); }
    },

    inAnimation: function() {
      var registerSection = $('#register')
      ,   heading         = $('#new_deal_header')
      ,   copyBlock       = registerSection.find('.copy_block')
      ,   registerButton  = copyBlock.find('a')
      ,   count           = 3
      ,   complete        = function() {
            count--;
            if(count == 0) {
              registerSection.trigger('inAnimationDidFinish');
            }
          };

      registerSection.trigger('inAnimationWillBegin');

      heading
        .css({ top: '20px', opacity: 0})
        .animate(heading.data('original-style').css, 300, 'easeInOutExpo', complete);

      copyBlock
        .delay(200)
        .css({ top: '20px', opacity: 0})
        .animate(heading.data('original-style').css, 300, 'easeInOutExpo', complete);

      registerButton
        .delay(410)
        .css({ bottom: '6px', opacity: 0})
        .animate(registerButton.data('original-style').css, 300, 'easeInOutExpo', complete);

    },

    outAnimation: function() {
      var registerSection = $('#register')
      ,   heading         = $('#new_deal_header')
      ,   copyBlock       = registerSection.find('.copy_block')
      ,   registerButton  = copyBlock.find('a')
      ,   count           = 3
      ,   complete        = function() {
            count--;
            if(count == 0) {
              registerSection.hide();
              registerSection.trigger('outAnimationDidFinish');
            }
          };

      registerSection.trigger('outAnimationWillBegin');

      heading.animate({
        top     : '20px',
        opacity : 0
      }, 300, 'easeInOutExpo', complete);

      copyBlock.animate({
        top     : '20px',
        opacity : 0
      }, 300, 'easeInOutExpo', complete);

      registerButton.animate({
        opacity : 0
      }, 300, 'easeInOutExpo', complete);
    }
  },

  info: {
    init: function() {
      var infoSection = $('#info');

      this.info_information.init()
      this.info_area.init();
      this.info_hotel.init();

      infoSection.find('.sub_section').hide();

      infoSection
        .bind('outAnimationWillBegin', function() {
          infoSection.addClass('animating');
        })
        .bind('outAnimationDidFinish', function() {
          infoSection.removeClass('animating').hide();
          globalEvent('outAnimationDidFinish');
        })
        .bind('inAnimationWillBegin', function() {
          $('#main_nav').fadeIn(250);
          infoSection.addClass('animating').show();
        })
        .bind('inAnimationDidFinish', function() {
          infoSection.removeClass('animating');
        })
        .bind('subPageOutAnimationWillBegin', function(){
          infoSection.addClass('animating');
        })
        .bind('subPageOutAnimationDidFinish', function(event, callParentEvent) {
          infoSection.removeClass('animating');
          globalEvent('subPageOutAnimationDidFinish');
          if(callParentEvent) { infoSection.trigger('outAnimationDidFinish'); }
        });
    },

    inAnimation: function() {
      var $infoSection     = $('#info')
      ,   targetSectionID  = $('#info_information').attr('id')
      ,   $navigationLinks = $infoSection.find('nav a')
      ,   complete         = function() { SECTIONS.info[targetSectionID].inAnimation(); };

      $infoSection.trigger('inAnimationWillBegin');
      $navigationLinks.removeClass('active')
                      .first().addClass('active');

      $navigationLinks
        .css({ top: -15, opacity: 0 })
        .each(function(i, link) {
          var delay = i+1;
          $(link).delay(delay*150).animate({
            top     : 0,
            opacity : 1
          }, 300, 'easeInOutExpo', function() {
            if(i==$navigationLinks.length-1) { complete(); }
          });
        });
    },

    outAnimation: function() {
      var currentSectionID = $('#info').find('.sub_section:visible').attr('id');
      this[currentSectionID].outAnimation(true);
    },

    info_hotel: {
      init: function() {
        var hotelInformation   = $('#hotel_information')
        ,   expenseInformation = $('#expense_information');

        if(!hotelInformation.data('original-style')){ hotelInformation.data('original-style',  { css: {opacity: 1, left:parseInt(hotelInformation.css('left'))}}); }
        if(!expenseInformation.data('original-style')){ expenseInformation.data('original-style',  { css: {opacity: 1, left:parseInt(expenseInformation.css('left'))}}); }
      },

      outAnimation: function(changingMajorPage) {
        var infoSection = $('#info')
        ,   subSection  = $('#info_hotel')
        ,   hotelInformation   = $('#hotel_information')
        ,   expenseInformation = $('#expense_information')
        ,   count       = 1
        ,   complete    = function() {
              count--;
              if(count == 0) {
                subSection.hide();
                infoSection.trigger('subPageOutAnimationDidFinish', changingMajorPage);
              }
            };

        infoSection.trigger('subPageOutAnimationWillBegin');

        hotelInformation.animate({
          left    : hotelInformation.data('original-style').css.left+140,
          opacity : 0
        }, 300, 'easeInOutExpo', complete);

        expenseInformation.animate({
          left    : expenseInformation.data('original-style').css.left+140,
          opacity : 0
        }, 300, 'easeInOutExpo', complete);
      },

      inAnimation: function() {
        var infoSection = $('#info')
        ,   subSection  = $('#info_hotel')
        ,   hotelInformation   = $('#hotel_information')
        ,   expenseInformation = $('#expense_information')
        ,   count       = 2
        ,   complete    = function() {
              count--;
              if(count == 0) {
                infoSection.trigger('inAnimationDidFinish');
              }
            };

        infoSection.trigger('inAnimationWillBegin');

        // prepare for animation
        hotelInformation.show().css({ left: hotelInformation.data('original-style').css.left+140, opacity: 0 });
        expenseInformation.show().css({ left: expenseInformation.data('original-style').css.left+140, opacity: 0 });
        subSection.show();

        // animate
        hotelInformation.animate({
          left    : hotelInformation.data('original-style').css.left,
          opacity : 1
        }, 300, 'easeInOutExpo', complete);

        expenseInformation.animate({
          left    : expenseInformation.data('original-style').css.left,
          opacity : 1
        }, 300, 'easeInOutExpo', complete);
      }
    },

    info_area: {
      init: function() {
        var dcMap = $('#dc_map');
        if(!dcMap.data('original-style')) { dcMap.data('original-style', { css: {opacity: 1, left:parseInt(dcMap.css('left'))}}); }
      },

      outAnimation: function(changingMajorPage) {
        var infoSection = $('#info')
        ,   subSection  = $('#info_area')
        ,   dcMap       = $('#dc_map')
        ,   count       = 1
        ,   complete    = function() {
              count--;
              if(count == 0) {
                subSection.hide();
                infoSection.trigger('subPageOutAnimationDidFinish', changingMajorPage);
              }
            };

        infoSection.trigger('subPageOutAnimationWillBegin');

        dcMap.animate({
          left    : dcMap.data('original-style').css.left+140,
          opacity : 0
        }, 300, 'easeInOutExpo', complete);
      },

      inAnimation: function() {
        var infoSection = $('#info')
        ,   subSection  = $('#info_area')
        ,   dcMap       = $('#dc_map')
        ,   count       = 2
        ,   complete    = function() {
              count--;
              if(count == 0) { infoSection.trigger('inAnimationDidFinish'); }
            };

        infoSection.trigger('inAnimationWillBegin');

        // prepare for animation
        dcMap.show().css({ left: dcMap.data('original-style').css.left+140, opacity: 0 });
        subSection.show();

        // animate
        dcMap.animate({
          left    : dcMap.data('original-style').css.left,
          opacity : 1
        }, 300, 'easeInOutExpo', complete);
      }
    },

    info_information: {
      init: function() {
        var image       = $('#info_image')
        ,   heading     = $('#info_info_heading')
        ,   text        = $('#info_text')

        if(!image.data('original-style'))   { image.data('original-style',    { css: {opacity: 1, top:parseInt(image.css('top'))}}); }
        if(!text.data('original-style'))    { text.data('original-style',     { css: {opacity: 1, left:parseInt(text.css('left'))}}); }
        if(!heading.data('original-style')) { heading.data('original-style',  { css: {opacity: 1, lineHeight:heading.css('lineHeight')}}); }
      },

      outAnimation: function(changingMajorPage) {
        var infoSection = $('#info')
        ,   subSection  = $('#info_information')
        ,   image       = $('#info_image')
        ,   heading     = $('#info_info_heading')
        ,   text        = $('#info_text')
        ,   count       = 3
        ,   complete    = function() {
              count--;
              if(count == 0) {
                subSection.hide();
                infoSection.trigger('subPageOutAnimationDidFinish', changingMajorPage);
              }
            }

        infoSection.trigger('subPageOutAnimationWillBegin');

        heading.animate({
          lineHeight : '65px',
          opacity    : 0
        }, 350, 'easeInOutExpo', complete);

        image.animate({
          top     : image.data('original-style').css.top+140,
          opacity : 0
        }, 200, 'easeInOutExpo', complete);

        text.animate({
          left    : text.data('original-style').css.left+140,
          opacity : 0
        }, 200, 'easeInOutExpo', complete);
      },

      inAnimation: function() {
        var infoSection = $('#info')
        ,   subSection  = $('#info_information')
        ,   image       = $('#info_image')
        ,   heading     = $('#info_info_heading')
        ,   text        = $('#info_text')
        ,   count       = 3
        ,   complete    = function() {
              count--;
              if(count == 0) { infoSection.trigger('inAnimationDidFinish'); }
            };

        infoSection.trigger('inAnimationWillBegin');

        // prepare for animation
        heading.show().css({ lineHeight: '65px', opacity: 0 });
        image.show().css({ top: image.data('original-style').css.top+240, opacity: 0 });
        text.show().css({ left: text.data('original-style').css.left+140, opacity: 0 });
        subSection.show();

        // animate
        heading.animate(heading.data('original-style').css, 500, 'easeInOutExpo', complete)
        image.animate(image.data('original-style').css,     200, 'easeInOutExpo', complete);
        text.animate(text.data('original-style').css,       300, 'easeInOutExpo', complete);
      }
    }
  },

  index: {
    init: function() {
      var indexSection = $('#index');

      indexSection
        .bind('outAnimationWillBegin', function() {
          indexSection.addClass('animating');
        })
        .bind('outAnimationDidFinish', function() {
          $('#main_nav').fadeIn(250);
          $('#index_navigation').hide();
          $('#tech_and_history').hide();
          indexSection.removeClass('animating')
                             .hide();

          globalEvent('outAnimationDidFinish');
        })
        .bind('inAnimationWillBegin', function() {
          $('#main_nav').fadeOut(150);
          indexSection.addClass('animating')
                             .show();
          $('#index_navigation').show();
          $('#tech_and_history').show();
        })
        .bind('inAnimationDidFinish', function() {
          indexSection.removeClass('animating');
        });

      var techAndHistory   = $('#tech_and_history')
      ,   indexTalksButton = $('#index_talks_button')
      ,   indexInfoButton  = $('#index_info_button');

      if(!techAndHistory.data('original-style'))   { techAndHistory.data('original-style',   { css: {right:techAndHistory.css('right')}}); }
      if(!indexTalksButton.data('original-style')) { indexTalksButton.data('original-style', { css: {opacity: 1, top:indexTalksButton.css('top'), right:indexTalksButton.css('right')}}); }
      if(!indexInfoButton.data('original-style'))  { indexInfoButton.data('original-style',  { css: {opacity: 1, top:indexInfoButton.css('top'), left:indexInfoButton.css('left')}}); }
    },

    inAnimation: function() {
      $('#index').trigger('inAnimationWillBegin');
      var count = 4;
      var complete = function() {
        count--;
        if(count == 0) { $('#index').trigger('inAnimationDidFinish'); }
      };

      var techAndHistory   = $('#tech_and_history')
      ,   indexNavigation  = $('#index_navigation')
      ,   indexTalksButton = $('#index_talks_button')
      ,   indexInfoButton  = $('#index_info_button');

      techAndHistory
        .css({ right: '-' + techAndHistory.width() + 'px' })
        .animate(techAndHistory.data('original-style').css, 300, 'easeInOutExpo', complete);

      indexNavigation
        .hide()
        .fadeIn(350, complete);

      indexTalksButton
        .css({ top: -300, right: -200, opacity: 0})
        .delay(600)
        .animate(indexTalksButton.data('original-style').css, 500, 'easeInOutExpo', complete);

      indexInfoButton
        .css({ top: 500, left: -200, opacity: 0})
        .delay(600)
        .animate(indexInfoButton.data('original-style').css, 500, 'easeInOutExpo', complete);
    },

    outAnimation: function() {
      $('#index').trigger('outAnimationWillBegin');
      var count = 4;
      var complete = function() {
        count--;
        if(count == 0) { $('#index').trigger('outAnimationDidFinish'); }
      };

      $('#index_talks_button').animate({ top: -300, right: -200, opacity: 0}, 350, 'easeInOutExpo', complete);
      $('#index_info_button').animate({  top: 500,  left: -200,  opacity: 0}, 350, 'easeInOutExpo', complete);
      $('#index_navigation').fadeOut(400, complete);
      $('#tech_and_history').delay(200).animate({ right: '-' + $('#tech_and_history').width() + 'px' }, 200, 'easeInOutExpo', complete)
    }
  }
};


var goToSection = function(section){
  var targetID         = section
  ,   $target          = $('#'+targetID)
  ,   targetParentID   = ''
  ,   $current         = $('#content section:visible')
  ,   currentID        = $current.attr('id')
  ,   currentParentID  = '';

  if($current.find('.sub_section:visible').length) {
    currentParentID  = currentID;
    currentID = $current.find('.sub_section:visible').attr('id');
  }

  if($target.parents('section').length) {
    targetParentID = $target.parents('section').attr('id');
  }

  if(currentID == targetID) { return; }

  if(currentParentID) { // if current page is a sub page
    $('body').bind('subPageOutAnimationDidFinish', function() {
      if(targetParentID) {
        SECTIONS[targetParentID][targetID]['inAnimation']();
      } else {
        SECTIONS[targetID]['inAnimation']();
      }
      $('body').unbind('subPageOutAnimationDidFinish');
    });

    var navigatingToMainPage = (targetParentID ? false : true);
    SECTIONS[currentParentID][currentID]['outAnimation'](navigatingToMainPage);
  } else { // if current page is a main page
    if(currentID && (SECTIONS[currentID])) {
      $('body').bind('outAnimationDidFinish', function() {
        if(targetParentID) {
          SECTIONS[targetParentID][targetID]['inAnimation']();
        } else {
          SECTIONS[targetID]['inAnimation']();
        }
        $(this).unbind('outAnimationDidFinish');
      });

      SECTIONS[currentID]['outAnimation']();
    } else { // dom ready
      if(targetParentID) {
        SECTIONS[targetParentID][targetID]['inAnimation']();
      } else {
        SECTIONS[targetID]['inAnimation']();
      }
    }
  }
};

$(function() {
  $('body').addClass('js');
  SECTIONS.init();

  $.backstretch('images/map.jpg');
  setTimeout(function() {
    $.history.init(function(hash){
      goToSection(hash == '' ? 'index' : hash);
      $('#content section:visible nav')
        .find('a').removeClass('active').end()
        .find('[href=#' + hash + ']').addClass('active');
    }, { unescape: ",/" });
  }, 300);

  $('#footer').css({ height: '50' });
  $('#footer .logo').each(function(i, logo){
    logo = $(this);

    logo.css({
      width      : logo.data('width'),
      height     : logo.data('height'),
      textIndent : '-999em',
      background : 'url(images/' + logo.data('logo') + ')'
    });
  });
});
