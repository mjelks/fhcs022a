# Section 8 : Client Server Architecture | Server-Side JavaScript

## Client Server Architecture

### 15.1 Overview

#### A web server is a program that waits for clients to make a request and then delivers a response. The response may include an HTML document, or any other content such as JavaScript modules, images, style sheets or more.

### 15.2 HTTP

Clients and servers communicate using the HTTP protocol.

**An HTTP request includes:**

- The HTTP request method or “verb” such as POST or GET.
- The URL being requested.
- Optional  headers that may include authentication information.         
- An optional request body.
- An HTTP response includes:

**A  status code such as 200 for ‘OK’ (success) or  404 for ‘Not Found’.**
- Some headers that allow the server to pass additional information about the response such as  the content type.
- The response body:  this may be a source HTML document.

### 15.3. TCP/IP Addresses and Port Numbers

- HTTP relies on TCP/IP to send and receive sequences of bytes.
- Each application must use a different port.  The ports are numbered from 1 to 65535.
- Note that when we don’t specify a port, the default port 80 is used.

## Server-Side JavaScript

### 16.1 Overview

JavaScript is a general purpose language and there are several frameworks that offer access to a JavaScript interpreter outside the browser.   The most prevalent of these frameworks are Rhino and Node.

Rhino is free and available from Mozilla. It is implemented in Java.  It allows us to write JavaScript code that manipulates Java objects and uses Java methods.

Node is a more recent solution.  It is written in C.  It supports an asynchronous, event-driven model that makes it highly scalable.  It also contains a built-in HTTP server library that allows us to run a web server without using any external software such as Apache. 

### 16.2 Getting Started with Node

- Node is free and available from http://nodejs.org .   Click on INSTALL to install it on your system.

### 16.3 Node Asynchronous Programming

Even though node is single-threaded, its event-driven, non-blocking approach makes it highly scalable.  We’ll illustrate this approach with a simple example that accesses the file system.

### 16.4 Our First Web Server
### 16.5 User Authentication
### 16.6 Database Access
