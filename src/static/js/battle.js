/*
 * battle.js
 * Author: Erwin Leonardy
 * Descrption: This script contains the animation of the battle page
 *             and event listeners
 */

 window.onload(function(){
     // function triggers when human plays the game
     function humanPlayer() {
          // show the counter animation
          var counter = document.getElementById('counter').innerHTML;
          var interval = setInterval(function() {
              counter--;

              // update the counter of the view
              document.getElementById('counter').innerHTML = String(counter);

              // stop when time runs out
              if (counter == 0) {
                 setTimeout(function() 
                 {
                     alert("Time's up! We will pick a random move for ya!");
                     sendData(interval, 'Random', 'option');
                 }, 100); // short delay to allow counter to turn 0
              }   
          }, 1000);

         // change opacity on mouse over
         $("img").mouseenter(function(e){
             var idVisited = e.target.id;
             document.getElementById(idVisited).style.opacity = "0.5";
         });

         $("img").mouseleave(function(e){
             var idLeft = e.target.id;
             document.getElementById(idLeft).style.opacity = "1";
         });

         // send form on mouse click
         $("img").click(function(e){
             var idClicked = e.target.id;
             document.getElementById(idClicked).style.opacity = "0.5";
             document.getElementById(idClicked).src = "/static/img/" + idClicked + "_Selected.png";
             sendData(interval, idClicked, 'option');
         });
     };

     // function triggers when computer plays the game
     function computerPlayer()
     {
         // do random selection move animation for (300ms * 10) = 3 seconds
         var counter = 10;
         var interval = setInterval(function() {
             counter--;

             // updated oponent's picture
             var opponents = document.getElementsByClassName("opp");
             var opponentIdx = Math.floor((Math.random() * 10) % 3);

             for (var i = 0; i < opponents.length; i++)
             {
                 if (i != opponentIdx)
                 {
                     opponents[i].style.opacity = "0.5";
                     opponents[i].src = "/static/img/" + opponents[i].id + "_Inverted.png";
                 }
                 else
                 {
                     opponents[i].style.opacity = "1.0";
                     opponents[i].src = "/static/img/" + opponents[i].id + "_Selected_Inverted.png";
                 }
             }

             // updated player's picture
             var players = document.getElementsByClassName("player");
             var playerIdx = Math.floor((Math.random() * 10) % 3);

             for (var i = 0; i < players.length; i++)
             {
                 if (i != playerIdx)
                 {
                     players[i].style.opacity = "0.5";
                     players[i].src = "/static/img/" + players[i].id + ".png";
                 }
                 else
                 {
                     players[i].style.opacity = "1.0";
                     players[i].src = "/static/img/" + players[i].id + "_Selected.png";
                 }
             }

             // stop the animation
             if (counter == 0) {
                 sendData(interval, 'Random', 'option');
             }   
         }, 300);
     }

     // sends user's response to server using 'POST' Method
     function sendData(interval, data, argName)
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
                 clearInterval(interval);    // to stop the timer or animation
                 document.write(response);   // to reload the HTML page
                 document.close();
             },

             error: function(jqXHR, textStatus, errorThrown) 
             { alert(errorThrown) }
         });
     }
});
