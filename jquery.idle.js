/**
 *  File: jquery.idle.js
 *  Title:  JQuery Idle.
 *  A dead simple jQuery plugin that executes a callback function if the user is idle.
 *  About: Author
 *  Rodney Carvalho forked from Henrique Boaventura (hboaventura@gmail.com).
 *  About: Version
 *  1.1.1
 *  About: License
 *  Copyright (C) 2013, Rodney Carvalho / Henrique Boaventura
 *  MIT License:
 *  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *  - The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 **/ 

(function( $ ){
  $.fn.idle = function(options) {

    var defaults = {
      preIdle: 30000,
      idle: 60000, //idle time in ms
      events: 'keypress mousemove DOMMouseScroll mousewheel mousedown touchstart touchmove', //events that will trigger the idle resetter
      onPreIdle: function(){}, //callback function to be executed after idle time
      onIdle: function(){}, //callback function to be executed after idle time
      onActive: function(){} //callback function to be executed after back from idleness
    };

    var idle = 0;
    var ids = [];
    var settings = $.extend( {}, defaults, options );

    var resetTimeout = function(settings){
      while(id = ids.pop()){
        // console.log("clearing " + id); 
        clearTimeout(id);
      }
      if(idle > 0){
        settings.onActive.call();
      }
      idle = 0;
      timeout(settings);
    }

    var timeout = function(settings){
      id1 = setTimeout(function(){
        if(idle < 1){
          idle = 1;
          settings.onPreIdle.call();
        }
      }, settings.preIdle);
      // console.log("adding " + id1);
      ids.push(id1);
      id2 = setTimeout(function(){
        if(idle == 1){
          idle = 2;
          settings.onIdle.call();
        }
      }, settings.idle);
      // console.log("adding " + id2);
      ids.push(id2);
    }

    return this.each(function(){
      timeout(settings);
      $(this).bind(settings.events, function(e){
        resetTimeout(settings);
      });
    }); 

  }; 
})( jQuery );