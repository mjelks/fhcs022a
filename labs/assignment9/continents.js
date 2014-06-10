/**
 * Created by mjelks on 6/10/14.
 */

 (function () {
     'use strict';

     function getAjaxData(event) {
         var filename = event.target.id + '.json';
         console.log(filename);
         var request = new XMLHttpRequest();
         request.open('GET', filename);
         request.send();
         request.onreadystatechange = function() {
           if (request.readyState === 4 && request.status === 200){
             var info = '';
             var data = JSON.parse(request.responseText);
             for (var prop in data) {
                info += ('<p>' + prop + ': ' + data[prop] + '</p>');
             }
             document.getElementById("description").innerHTML = info;
           }
         };

     };
     // Register event handlers to get the additional info if requested
     $('img') .on('click', getAjaxData);
 } ());
