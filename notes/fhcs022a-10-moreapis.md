# Section 10 : Some More HTML5 APIs

## HTML5 APIs

### 18.1. Web Storage Overview

#### The HTML5 Web Storage API allows web applications to store data locally on the user’s device.  For instance a web app may store certain user preferences, or progress through a lesson plan, or scores in a game.

- This kind of storage is **specific to a single origin**. 
  - The origin is defined as the combination of scheme, such as http, domain, such as foothill.edu, and port number such as 8080 for our own node server. 
  - The data stored through the web storage API is browser specific
  
- **The web storage API includes the localStorage and sessionStorage objects.** 
  - It is important to note that the data here is stored as plain text, unencrypted 

### 18.2. The localStorage Object

#### Examples

```javascript
var player = document.getElementById("playername").value;
localStorage["lastplayer"] = player;
// OR
localStorage.lastplayer = player;

// We are basically creating a "lastplayer" property of the localStorage object.
// We can also use the setItem() property of the localStorage object to get the same result as above:
localStorage.setItem("lastplayer", player);

localStorage.getItem("lastplayer");
// "Alice"


localStorage.setItem("score", 1);
localStorage.score
// 1

// removes that element
localStorage.removeItem("lastplayer");

// clear all contents
localStorage.clear(); 
```

#### The data stored in the localStorage object is permanent.  It has no expiration date and it does not disappear when the browser is closed.

### 18.3. The sessionStorage Object

- The sessionStorage object is similar to the localStorage object.  
- Accessed through the property of the window object:  window.sessionStorage (or simply sessionStorage). 

#### The difference is in lifetime and scope.

##### The sessionStorage that we defined in the first tab is only accessible from that tab.

##### The sessionStorage object  is cleared when the corresponding window is closed.

### 18.4. The Application Cache

#### The Application Cache, introduced in HTML5 deals with a slightly different aspect of caching.  It allows us to have *web applications available offline*, when the device does not have internet access.

- The application cache is different from the browser’s cache. While the browser’s cache has a size limit and keeps the most recently used data only, the application cache is permanent.  Applications stored there remain there until they are explicitly deleted.

- To enable application cache, we must first create a manifest file.  A manifest file is a text file that includes the resources that our application needs to run.  These resources include source HTML documents, images, stylesheets and JavaScript files used. The manifest file tells the browser what to cache and what to never cache.

- It may have three sections
  - **CACHE**:  - Files listed under this header will be cached after they are downloaded for the first time.  This is the section that we need here.  In order for an application to be available offline, its associated html source,  JavaScript files, style sheets, any images or other resources needed must be listed in this section. 

  Note that the section header (CACHE:) may be omitted.  Files listed immediately after the CACHE MANIFEST line are assumed to belong to the CACHE section.

  - **NETWORK**: - Files listed under this header require a connection to the server, and will never be cached.

  - **FALLBACK**: - This section specifies fallback pages the browser should use if a resource is inaccessible. Each entry in this section lists two URIs—the first is the resource, the second is the fallback.

- **The recommended file extension for a manifest file is "appcache".**

Example:

drawapp.appcache <== Filename

CACHE MANIFEST
drawapp.html
draw.js

Example html :

```html
<!DOCTYPE html>
<html manifest="**drawapp.appcache**">
<head>
<meta charset="utf-8">
<title>Let's Draw</title>
</head>
<body>
<h2> Just click inside the box </h2>

<canvas id="myCanvas" width="300" height="300" style="border:1px solid #c3c3c3;">
</canvas>

<script async src="draw.js"></script>

</body>
</html>
```

### 18.5. History Management

#### HTML5 introduced an API that allows us to implement seamless history management in a dynamic application.

##### We can modify our JavaScript code to use the pushState() method and the popstate event as follows:

- The pushState() method allows us to add an entry to the history object.  The syntax is:

```javascript
history.pushState(stateObject, title, URL)
```

- stateObject is an object that contains all the information needed to restore the current state of the document. Any object that can be converted to a string with JSON.stringify() will work here.  When the user navigates back or forth from one history entry to the other, a copy of the stateObject associated with the current history entry becomes available through history.state.

- The title parameter is currently ignored by major browsers.  It refers to a title to be associated with that state.

- The URL parameter is optional.  It allows us to associate each state with a unique url.  This URL will appear in the browser’s location bar.  If an absolute url is specified, it must have the same origin as the current url (the url of the corresponding static web page).

```javascript
// This function takes a parameter, line, and writes the corresponding

// text to the element with id: response.

function displayIt(line){

    // store the text corresponding to the two options in an object

    // with properties first and second.

    var lineContent = {first: "First Line", second: "Second line"};

    // display the corresponding line in the html element with id response

    document.getElementById("response").textContent = lineContent[line];

};

   

function update(event){

    var stateObject;  // our state object will simply contain a string

    displayIt(event.target.id);

    // determine which button was clicked from the event.target

    // and push the corresponding state object

    if (event.target.id === "first") {

        // identify the state corresponding to FIRST button

        stateObject = "first";  

        history.pushState(stateObject,"First Line", "#first");      

    } else {

        // identify the state corresponding to SECOND button

        stateObject = "second";

        history.pushState(stateObject,"Second Line", "#second");

    }   

};

 

// Generate the web page corresponding to the state in history.state.

// If no state is available, restore the original web page.

function generateState(){

    if (history.state) {

       displayIt(history.state);

    } else {

        document.getElementById("response").textContent = "";

    }

};

 

// Add event listeners to call update() when a button is clicked

document.getElementById("first").addEventListener("click", update);

document.getElementById("second").addEventListener("click", update);

// Add even listener to handle popstate event on the window

window.addEventListener("popstate", generateState);

// Handle the special case of reload

if (history.state) {

    generateState();

}
```

### 18.6. Geolocation

#### The HTML5 Geolocation API gives us access to the geographical position of a user with their permission.

##### We use the **getCurrentPosition()** method to access the position. This method is *asynchronous*.  It takes a callback function. 

```javascript
// Show the latitude and the longitude corresponding to the given position

function showPosition(position)

  {

      document.getElementById("latitude").textContent = position.coords.latitude;

      document.getElementById("longitude").textContent = position.coords.longitude;

  }

document.getElementById("findme").addEventListener("click", function (){

    navigator.geolocation.getCurrentPosition(showPosition);

});
```

### 18.7. Web Workers

#### The Web Workers API allows us to run  computationally intensive JavaScript code in a background thread without affecting the performance of the web page.

```javascript
function update() {

    // Get the two input numbers

    var firstNumber = parseFloat(document.getElementById("first").value) || 0;

    var secondNumber = parseFloat(document.getElementById("second").value) || 0;

    // Then  compute the sum

    var myAnswer = firstNumber + secondNumber;

    // And write it in the “answer” element if it is a valid answer

    document.getElementById("answer").textContent = myAnswer;

};

// start of worker script
function startWorker() {

    var worker = new Worker("compute.js");  // instantiate worker object

    worker.addEventListener("message", function(event) {

       document.getElementById("result").textContent = event.data;

    });

};

 

document.getElementById("first").addEventListener("input", update, false);
document.getElementById("second").addEventListener("input", update, false);
document.getElementById("start").addEventListener("click", startWorker, false);
```

- startWorker() starts by instantiating a new worker object that will execute to code found in the script compute.js.

- **The main script and the worker script can now communicate via messages**

### 18.8. Web Sockets

#### The WebSocket API implements a new communication protocol that enables us to develop low latency, real-time applications such as multi-player online games.

- web sockets define a **persistent bidirectional connection between a client and a server**. 

```javascript
var connection = new WebSocket ("ws://host:port/resource");

// ws is the protocol here.  We can also use wss for the secure version (corresponding to https).  Then we specify the host, possibly the port number and resource.  Web sockets may share ports with http connections.

// Once we have created a connection, we can send data on it as plain text. JSON encoding is very handy here when we have some complex data to transmit.  The latest browsers also allow binary data to be sent.

connection.send (“Hello Server World!”);

//We can also register event handlers on the connection.

connection.onmessage (function (event) {

    var  message = event.data; // Get the message

    //do something with it

};

// When we are done we can close the connection:

connection.close();

```

#### The important thing to realize here is that once we open the connection, the server can send us messages at any time without waiting for a specific request.




