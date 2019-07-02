# Filename: controller.py
# Author: Erwin Leonardy
# Descrption: This file serves as the controller of our MVC Architecture

from flask import session
from src.model.model import GameFactory

class Controller():
    @staticmethod
    def playGame (playerName, playerMove=None, opponentMove=None):
        game = GameFactory()

        # get the moves if it is not provided
        if playerMove == None:
            playerMove = game.generateMove()
        if opponentMove == None:
            opponentMove = game.generateMove()

        # checks who is the winner
        playerFactory = game.getMoveFromFactory(playerMove)
        result = playerFactory.fight(opponentMove)
        session['round'] += 1

        # return response based on result
        if result == 1:
            session['p1Win'] += 1
            return playerName + " won!", playerMove, opponentMove
        elif result == -1:
            session['p2Win'] += 1
            return playerName + " lost!", playerMove, opponentMove
        else:
            return "It is a draw!", playerMove, opponentMove