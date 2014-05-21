# Section 6 : Event Driven Programming & Scripting Style

## Event Driven Programming

### 10.1 Events, Targets, and Listeners

- client side JS waits for **events** (event-driven)
- standard web events that browser listens to:
    - https://developer.mozilla.org/en-US/docs/Web/Reference/Events
- **event target** ==> object on which the event happened
- **event handler/listener** function that responds to the event
- application needs to register the event handler

### 10.2 Registering Event Listeners

#### The recommended way to register events for current browsers is by using the addEventListener() method.

```javascript
function update() {
 
    // Get the two input numbers
    var firstNumber = Number(document.getElementById('first').value);
    var secondNumber = Number(document.getElementById('second').value);
 
    // Then  compute the sum
    var myAnswer = firstNumber + secondNumber;
 
    // And write it in the 'answer' element 
    document.getElementById('answer').textContent = myAnswer;
};

//Once we have defined the update function, we only need to add the following two lines to our main program.

document.getElementById('first').addEventListener('input', update, false);
document.getElementById('second').addEventListener('input', update, false);
```

### 10.3 The Event Object

#### The event object is always implicitly passed as an argument to the event listener function. 

```html
<canvas id="myCanvas" width="300" height="300" style="border:1px solid #c3c3c3;"></canvas>
```

```JavaScript
function drawSquare(event) {

    // Our function takes the event object as a parameter

    var myCanvas = document.getElementById('myCanvas');

    // compute the coordinates with respect to the canvas

    var x = event.clientX - myCanvas.offsetLeft;

    var y = event.clientY - myCanvas.offsetTop;

    // to access the canvas, we need its context  

    var myContext = myCanvas.getContext('2d');

    // set the color to red 

    myContext.fillStyle = '#FF0000';

    // draw a 10 by 10 square starting at the click event position

    myContext.fillRect(x, y, 10, 10);

};

document.getElementById('myCanvas') .addEventListener('click', drawSquare, false);
```
 
### 10.4 Event Bubbling

#### Most events bubble up the DOM tree.  

- So when an event is triggered on an element, it is also triggered on its ancestors in the DOM.
- Event bubbling allows us to **register a single listener on a common ancestor** element and handle events there.

```javascript
document.body.addEventListener('input', update, false); 

// instead of this:
document.getElementById('first').addEventListener('input', update, false);
document.getElementById('second').addEventListener('input', update, false);
```

- **NOTE**: The listener may also stop further bubbling by invoking the stopPropagation() method on the event object:

```javascript
event.stopPropagation()
```

- There are some events such as the focus, blur and scroll events that don't.  
    - In that case, the event listener has to be registered directly on the element where the event will be triggered.

### 10.5 Event Capturing

#### Event capturing is an event propagation method that goes in the opposite order as event bubbling.

```javascript
function grandParentHandler(event) {
    console.log('Grandparent handler');
    console.log('this:', this.id);
    console.log('event.target:', event.target.id);
};

function parentHandler(event) {
    console.log('Parent handler');
    console.log('this:', this.id);
    console.log('event.target:', event.target.id);
};

function elementHandler(event) {
    console.log('Event handler');
    console.log('this:', this.id);
    console.log('event.target:', event.target.id); 
};

document.getElementById('grandParent').addEventListener('input',grandParentHandler,false);
document.getElementById('parent').addEventListener('input',parentHandler,false);
document.getElementById('myInput').addEventListener('input',elementHandler,false);
```
#### set useCapture parameter is set to true.

```JavaScript
document.getElementById('grandParent').addEventListener('input',grandParentHandler,false);
document.getElementById('parent').addEventListener('input',parentHandler,false);
document.getElementById('myInput').addEventListener('input',elementHandler,false);
```

#### Note that bubbling is much more common than capturing. 

### 10.6 Load Events

#### Events that are independent of the user  

- the DOMContentLoaded event
- the load event 

#### The DOMContentLoaded event is triggered on the document object when the source document has been parsed and the DOM is ready to be manipulated.

- **NOTE:** images, stylesheets and any other associated resources may not have been loaded yet.

#### The load event is triggered when a resource and all its dependent resources have finished loading.

```JavaScript
window.addEventListener('load', function () { console.log ('Loading is complete!');}, false);
document.addEventListener('DOMContentLoaded', function () { console.log ('DOM is ready!');}, false);
```

## Scripting Style

### 11.1 Separation of Layers
### 11.2 Cascading Style Sheets
### 11.3 Changing Styles with JavaScript
### 11.4 Hide and Show
### 11.5 Transition Example

#### We can add a transition effect when changing from one style to another.  We specify the transition for the class we are transitioning into.  We also specify each CSS property we want to add an effect to and the duration of the transition.

```html
<!DOCTYPE html>
<html>
 <head>
   <meta charset = "utf-8">
   <title>JavaScript for Programmers</title>
   <link rel = "stylesheet" type = "text/ css" href = "transitions.css" media = "all">
 </head>
 <body>
   <h2>Transition Demo</h2>
   <p>We create the zooming transition in CSS and trigger it from JavaScript.</p>
   <p><input id = "mybutton" type="button" value="Press Here"></p>
   <img id="tree" src="tree.png" alt="tree" class = "small">
   <script defer src="../scripts/tree.js"></script>
 </body>
</html>
```

```css
body {

      background-color: #c0e4fe;

}

.small {

      width: 100px;

      height: 100px;

      transition: height 5s, width 5s;   /* transition on height&width, duration 5 seconds */

      -webkit-transition: height 5s, width 5s; /* Safari */

}

.large {

      width: 300px;

      height: 300px;

      transition: height 5s, width 5s;   /* transition on height&width, duration 5 seconds */

      -webkit-transition: height 5s, width 5s; /* Safari */

}
```

```javascript
function toggle(event) {
 if (document.getElementById('tree').className === 'small'){
     document.getElementById('tree').className = 'large';
 }else {
     document.getElementById('tree').className = 'small';
 }
};
document.getElementById('mybutton').addEventListener('click', toggle, false);
```

### 11.6 Animation Example

```css
body {
  background-color:#98ff70;
}
.move{
  animation: moving 8s infinite alternate;
  -webkit-animation: moving 8s infinite alternate;/* Chrome and Safari */
}
@keyframes moving {
  from {
  }
  to {
   transform: translateX(800px) rotate(360deg);
  }
}
@-webkit-keyframes moving {
  from {
  }
  to {
   transform: translateX(800px) rotate(360deg);
  }
}
```

```javascript
function move(event) {
    // change the className to 'move' in order to move the ball
    document.getElementById('ball').className = 'move';
};

function stop(event) {
    // change the className to '' so that it is no longer 'move'
    document.getElementById('ball').className = 'stop';
};

document.getElementById('gobutton').addEventListener('click', move, false);
document.getElementById('stopbutton').addEventListener('click', stop, false);
```

```html
<!DOCTYPE html>
<html>
  <head>
                  <meta charset = "utf-8">
                  <title>JavaScript for Programmers</title>
                  <link rel = "stylesheet" type = "text/css" href = "animate.css" media = "all">
  </head>
  <body>
                  <h2>Animation Demo</h2>
                  <p>We create the animation in CSS and trigger it from JavaScript.</p>
                  <input id = "gobutton" type="button" value="GO">
                  <input id = "stopbutton" type="button" value="STOP">
                  <p>Click on the GO button to move the ball.</p>
                  <img id="ball" src="ball.png" alt="ball">
                  <script defer src="../scripts/animate.js"></script>
  </body>
</html>
```


