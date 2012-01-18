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
(function($){var locationWrapper={put:function(hash,win){(win||window).location.hash=this.encoder(hash)},get:function(win){var hash=((win||window).location.hash).replace(/^#/,'');try{return $.browser.mozilla?hash:decodeURIComponent(hash)}catch(error){return hash}},encoder:encodeURIComponent};var iframeWrapper={id:"__jQuery_history",init:function(){var html='<iframe id="'+this.id+'" style="display:none" src="javascript:false;" />';$("body").prepend(html);return this},_document:function(){return $("#"+this.id)[0].contentWindow.document},put:function(hash){var doc=this._document();doc.open();doc.close();locationWrapper.put(hash,doc)},get:function(){return locationWrapper.get(this._document())}};function initObjects(options){options=$.extend({unescape:false},options||{});locationWrapper.encoder=encoder(options.unescape);function encoder(unescape_){if(unescape_===true){return function(hash){return hash}}if(typeof unescape_=="string"&&(unescape_=partialDecoder(unescape_.split("")))||typeof unescape_=="function"){return function(hash){return unescape_(encodeURIComponent(hash))}}return encodeURIComponent}function partialDecoder(chars){var re=new RegExp($.map(chars,encodeURIComponent).join("|"),"ig");return function(enc){return enc.replace(re,decodeURIComponent)}}}var implementations={};implementations.base={callback:undefined,type:undefined,check:function(){},load:function(hash){},init:function(callback,options){initObjects(options);self.callback=callback;self._options=options;self._init()},_init:function(){},_options:{}};implementations.timer={_appState:undefined,_init:function(){var current_hash=locationWrapper.get();self._appState=current_hash;self.callback(current_hash);setInterval(self.check,100)},check:function(){var current_hash=locationWrapper.get();if(current_hash!=self._appState){self._appState=current_hash;self.callback(current_hash)}},load:function(hash){if(hash!=self._appState){locationWrapper.put(hash);self._appState=hash;self.callback(hash)}}};implementations.iframeTimer={_appState:undefined,_init:function(){var current_hash=locationWrapper.get();self._appState=current_hash;iframeWrapper.init().put(current_hash);self.callback(current_hash);setInterval(self.check,100)},check:function(){var iframe_hash=iframeWrapper.get(),location_hash=locationWrapper.get();if(location_hash!=iframe_hash){if(location_hash==self._appState){self._appState=iframe_hash;locationWrapper.put(iframe_hash);self.callback(iframe_hash)}else{self._appState=location_hash;iframeWrapper.put(location_hash);self.callback(location_hash)}}},load:function(hash){if(hash!=self._appState){locationWrapper.put(hash);iframeWrapper.put(hash);self._appState=hash;self.callback(hash)}}};implementations.hashchangeEvent={_init:function(){self.callback(locationWrapper.get());$(window).bind('hashchange',self.check)},check:function(){self.callback(locationWrapper.get())},load:function(hash){locationWrapper.put(hash)}};var self=$.extend({},implementations.base);if($.browser.msie&&($.browser.version<8||document.documentMode<8)){self.type='iframeTimer'}else if("onhashchange"in window){self.type='hashchangeEvent'}else{self.type='timer'}$.extend(self,implementations[self.type]);$.history=self})(jQuery);


$.extend($.easing,{
  easeInOutExpo: function (x, t, b, c, d) {
    if (t==0) return b;
    if (t==d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  }
});


var ScenesController = function() { };
ScenesController.prototype.performSegueTo = function(targetScene) {
  var self = this;

  if(self.currentScene) {
    self.bind('outAnimationDidFinish', function() {
      self.unbind('outAnimationDidFinish');
      targetScene.trigger('inAnimation');
      self.currentScene = targetScene;
    });

    self.currentScene.trigger('outAnimation');
  } else {
    targetScene.trigger('inAnimation');
    self.currentScene = targetScene;
  }
};

MicroEvent.mixin(ScenesController);


var Scene = function(data) {
  var self = this;

  self.container  = $(data.container);
  self.controller = data.controller;
  data.init.apply(self, Array.prototype.slice.call(arguments, 1));

  self.bind('inAnimation', function() {
        self.container.addClass('animating').show();
        self.trigger('inAnimationWillBegin', function() {
          self.inAnimation();
        });
      })
      .bind('outAnimation', function() {
        self.container.addClass('animating');
        self.trigger('outAnimationWillBegin', function() {
          self.outAnimation();
        });
      })
      .bind('_inAnimationDidFinish', function(){
        self.container.removeClass('animating');
        self.trigger('inAnimationDidFinish', function() {
          self.controller.trigger('inAnimationDidFinish');
        });
      })
      .bind('_outAnimationDidFinish', function() {
        self.container.removeClass('animating').hide();
        self.trigger('outAnimationDidFinish', function() {
          self.controller.trigger('outAnimationDidFinish');
        });
      });

  self.registerForAnimation = function(elements, completeEventName) {
    var animationCount = elements.length
    ,   complete       = function() {
          animationCount--;
          if(animationCount == 0) { self.trigger(completeEventName); }
    };

    $.each(elements, function(index, args) {
      var delay = args.delay || 0;
      if(args.element.length > 1) {
        setTimeout(function() {
          var eachDelay = 0;
          args.element.each(function(index, elm) {
            eachDelay += (args.eachDelay || 0);
            $(elm).delay(eachDelay).animate(args.animateToCSS, (args.duration || 500), (args.easing || 'easeInOutExpo'), complete);
          });
        }, delay);
      } else {
        args.element.delay(delay).animate(args.animateToCSS, (args.duration || 500), (args.easing || 'easeInOutExpo'), complete); 
      }
    });
  };

  self.registerForInAnimation = function(elements) {
    self.registerForAnimation(elements, '_inAnimationDidFinish');
  };

  self.registerForOutAnimation = function(elements) {
    self.registerForAnimation(elements, '_outAnimationDidFinish');
  };
};

MicroEvent.mixin(Scene);