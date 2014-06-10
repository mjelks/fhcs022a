/**
 * Created by mjelks on 6/10/14.
 */
(function () {
    'use strict';

    function getAjaxData() {
        var type = $(this).attr('id');
        var filename = 'ajax.html';
        //console.log(filename);
        $.get( filename, function( data ) {
            var info;
            // need to do this to convert the response from the open/close body tags  ONLY
            // otherwise html DOM traversal breaks in jQuery
            var data = '<div id="body-mock">' + data.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/g, '') + '</div>';
            var body = $(data);

            if (type == 'summary') {
                info = $(body).find(".important");
            } else {
                info = body;
            }

            $("#lesson").html(info);
        });
    };
    $('input').on('click', getAjaxData);
} ());