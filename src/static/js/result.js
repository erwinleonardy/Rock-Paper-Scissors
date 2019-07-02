/*
 * result.js
 * Author: Erwin Leonardy
 * Descrption: This script contains the animation of the result page
 *             that will highlight the moves that were chosen by the
 *             computer(s) and (or) player
 */

window.onload(function(){
    function showResult (playerMove, opponentMove, result) 
    {
        // updated oponent's picture
        var opponents = document.getElementsByClassName("opp");
        for (var i = 0; i < opponents.length; i++)
        {
            if (opponents[i].id != opponentMove)
                opponents[i].style.opacity = "0.5";
            else
                opponents[i].src = "/static/img/" + opponents[i].id + "_Selected_Inverted.png";
        }

        // updated player's picture
        var players = document.getElementsByClassName("player");
        for (var i = 0; i < players.length; i++)
        {
            if (players[i].id != playerMove)
                players[i].style.opacity = "0.5";
            else
                players[i].src = "/static/img/" + players[i].id + "_Selected.png";
        }
    }
}
