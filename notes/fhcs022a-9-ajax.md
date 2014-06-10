# Section 9 : AJAX

## AJAX

### 17.1 What is AJAX?

#### Ajax stands for Asnychronous JavasScript and XML.

- It refers to a set of techniques for **exchanging data with the server without causing pages to reload.**

- It allows web pages to be updated **asynchronously** by exchanging **small amounts of data** with the server. This of course results in a more responsive web application and a better user experience.

### 17.2 Sending Requests to the Server

#### The XMLHttpRequest object is used to exchange data with the server.

We can use the open() method on our newly created request object to set the HTTP request method and url.
The general syntax for the open() method is as follows:
open (method, url, async, user, password)

```javascript
var request = new XMLHttpRequest();
request.open('GET', 'data.txt');
// To send the request to the server, we use the send() method.  The send method may include the request body, if present.
//GET requests don’t include a body, so for the GET request above, we simply write:
request.send();

//So putting it all together, to send a GET request for the file 'data.txt', we have:
function sendRequest() {
    var request = new XMLHttpRequest();
    request.open('GET', 'data.txt');
    request.send();
}
// Use POST when we don’t want a cached version of the server's response 
// and when we are sending sensitive information.
function postRequest(){
    var request = new XMLHttpRequest();
    request.open("POST", "someurl");  // someurl depends on your server
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));
}
```

### 17.3. Handling Asynchronous Responses

####  Listen for 'readystatechange' events on the XMLHttpRequest object to be notified when request complete

- The readyState property describes the status of the request.  It has one of the following values:

0: UNSENT - open() has not been called yet
1: OPENED
2: HEADERS_RECEIVED
3: LOADING – loading the response
4: DONE

```javascript
request.onreadystatechange = function() {
  if (request.readyState === 4 && request.status === 200){
    // add code here to retrieve the response
  }
};
```

### 17.4. Retrieving the Responses

#### A complete HTTP response includes a status code, response headers, and a response body.

- We have access to all of these through the properties and methods of the XMLHttpRequest object. 

```javascript
// We can use getResponseHeader() to access the response headers.  To get the "Content-Type" information from the response header, we write:
var type = request.getResponseHeader("Content-Type");

// We can use the responseText property to access the response body as plain text. 
// The responseXML property allows us to access the response body when it is an XML or XHTML document.
// To display the response body on our web page in an element with id response, we can write:

document.getElementById("response").textContent = request.responseText; 
```

### 17.5. Simple Demo

### 17.6. Ajax with JSON

```javascript
/*
 * CS 22A -Business Review  - Ajax Implementation
*/

(function () {

    'use strict';

  

    function getAjaxData(event) {

        // create an XMLHttpRequest object

        var request = new XMLHttpRequest();      

        // the requested filename is given by the input element id

        var filename = event.target.id + ".json";    

        // Specify a GET request for the JSON file

        request.open("GET", filename);

        request.send();       

        // define the function to be called when the response is received.

        request.onreadystatechange = function () {

           // check that the response is complete and the request was successful

           if (request.readyState === 4 && request.status === 200){

              // Display the response - responseText is the JSON encoded string

               displayInfo(request.responseText);

           }

        };

    };

   

    function displayInfo(jsonString) {

        // convert the JSON encoded string to object

        var jsonObj = JSON.parse(jsonString);

        // build a string from the properties and their values.

        var info = '';

        for (var prop in jsonObj) {

            info += '<p>' + prop + ': ' + jsonObj[prop] + '</p>';

        }

        // display the additional info in the description html element

        document.getElementById("description").innerHTML = info;

    };

  

    // Register event handlers to get the additional info if requested

    document.getElementById("business").addEventListener("click", getAjaxData, false);

}());
```

### 17.7. Ajax with jQuery

- Note that jQuery provides two additional functions jQuery.get() and jQuery.post() that allow us to send asynchronous GET and POST requests to the server without having to deal with the details of the XMLHttpRequest object. Finally, the jQuery.ajax() function allows us to specify a more generic request with more control over the various request options.  More details about these functions are available at http://api.jquery.com/.

```javascript
/*

 * CS 22A -Business Review  - Ajax Implementation

 */

(function () {
    'use strict';
    
    function getAjaxData(event) {
        var filename = event.target.id + '.json'
        $.getJSON(filename, function (jsonObj) {
            var info = ''
            $.each(jsonObj, function (prop, value) {
                 info += ('<p>' + prop + ': ' + value + '</p>');
            });
            $('#description') .html(info);     
        });
    };
    // Register event handlers to get the additional info if requested
    $('input') .on('click', getAjaxData);
} ());
```

### 17.8. Limitations

#### Security: 

- Care must be taken not to transfer sensitive data as plain text in Ajax calls.
- Some consider that the increased communication between the client and the server may  make the application more vulnerable to security threats.

#### Search Engine Indexing: 

- The content of AJAX applications will not usually appear in search engine results.  Web crawlers do not crawl JavaScript code, so unless we use some other technique to make our content available to search engines, it will not appear in the search engine results.

#### Back Button and Bookmarking:

- History management and bookmarking are more challenging to implement in Ajax applications.  We'll see how to handle that from within our JavaScript program in the next module.
