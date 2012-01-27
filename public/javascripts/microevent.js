var MicroEvent  = function(){};
MicroEvent.prototype  = {
  bind  : function(event, fct){
    this._events = this._events || {};
    this._events[event] = this._events[event] || [];
    this._events[event].push(fct);
    return this;
  },
  unbind  : function(event, fct){
    this._events = this._events || {};
    if (event in this._events === false) return this;
    this._events[event].splice($.inArray(fct, this._events[event]), 1);
    return this;
  },
  trigger : function(event /* , args... */){
    this._events = this._events || {};
    if (event in this._events === false) return this;
    for (var i = 0; i < this._events[event].length; i++){
      this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    return this;
  }
};

/**
 * mixin will delegate all MicroEvent.js function in the destination object
 *
 * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
 *
 * @param {Object} the object which will support MicroEvent
*/
MicroEvent.mixin  = function(destObject){
  var props = ['bind', 'unbind', 'trigger'];
  for(var i = 0; i < props.length; i ++){
    destObject.prototype[props[i]]  = MicroEvent.prototype[props[i]];
  }
}

// export in common js
if( typeof module !== "undefined" && ('exports' in module)){
  module.exports  = MicroEvent;
}
