#jQuery Idle

A dead simple jQuery plugin that executes a callback function if the user is idle.


##Basic usage

Since this is a simple plugin, the usage is simple too.

First, add the jquery.idle.js to your document along with jQuery library:

```html
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
  <script type="text/javascript" src="jquery.idle.js"></script>
```

Then, just call the function in the element that you want to track user idleness

```js
$(document).idle({
  callback: function(){
  	alert('Since you waited so long, the answer to the Ultimate Question of Life, the Universe, and Everything is 42');
  },
  idle: 10000
})
```

That will display a alert (and a great revelation :D) to the user after 10 seconds of idleness.

You can also check if a specific element is idle, actually, you can use any jQuery selector:

```js
$('header, footer').idle({
  callback: function(){
  	alert('It\'s been a long time since you don\'t see me');
  },
  idle: 20000
})
```

And you can choose which events will be used to "refresh" the idle timer

```js
$(document).idle({
  callback: function(){
  	alert('It\'s been a long time since you don\'t see me');
  },
  events: 'mouseover mouseout'
  idle: 30000
})
```

##Options

```
callback		# callback function that will be triggered when the user gets idle
events			[ default = mousemove keypress mousedonw ] # events that will reset the idle time
idle			[ default = 60000 ] # idle time in ms
keep_tracking 	[ default = false ] # if you want to keep tracking user idleness, set it to true
```