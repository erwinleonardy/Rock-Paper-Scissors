/*
 * main.js
 * Author: Erwin Leonardy
 * Descrption: This script contains the animation of the main page
 *             that will redirect users to the intended game mode
 */

$(document).ready(function() {
    $("button").click(function(e){
        var idClicked = e.target.id;

        // redirect back to main page when users want to change game mode
        if (idClicked == "change")
            window.location.href = "/";

        // else, users must have pressed 'comp vs. comp' or 'player vs. comp'
        else
            sendData(idClicked, 'option')
    });

    // sends user's response to server using 'POST' Method
    function sendData(data, argName)
    {        
        var fd = new FormData();
        fd.append(argName, data)
        $.ajax({
            type: 'post',
            url: '/',
            data: fd,
            mimeType:"multipart/form-data",
            contentType: false,
            cache: false,
            processData: false,
            success: function(response){
                document.write(response); 
                document.close();
            },

            error: function(jqXHR, textStatus, errorThrown) 
            {  }
        });
    }
});