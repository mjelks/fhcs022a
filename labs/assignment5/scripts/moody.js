/**
 * Created by mjelks on 5/10/14.

 * JavaScript program that changes the image in the document every 5 seconds.
 The image changes from frown.gif to smile.gif, back to frown.gif and so on every 5 seconds.

 Modify the html file moody.html by adding a <script> tag pointing to  moody.js. The JavaScript file has to be saved in a separate scripts directory with the same parent directory as html.  For example you may have your files as:

 HINTS:

 1.  The setInterval() method introduced in module 8.4 may be used to call a function repeatedly.
 2.  Your web page has to toggle between a smile and a frown image.

 One way to keep track of the current image is by checking  the image source file.

 You can use the indexOf() string method to check if a string contains a certain substring.

 Remember that indexOf returns -1 if the substring is not found.

 */

'use strict';

function toggleSmileFrown() {
    var smile_image = "../smile.gif";
    var frown_image = "../frown.gif";

    document.getElementsByTagName('img')[0].src = (document.getElementsByTagName('img')[0].src.match(smile_image)) ? frown_image : smile_image;
}

setInterval(function(){ toggleSmileFrown()}, 5000);