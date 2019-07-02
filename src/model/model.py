# Filename: model.py
# Author: Erwin Leonardy
# Descrption: This file serves as the model of our MVC Architecture

import random

# in order to add a new move, simply add the element to 
# this list and create a new class with the win and lose 
# attributes specified in the constructor
moveType = ['Scissor', 'Paper', 'Rock']

# parent
class _Game:
    __win = {}
    __lose = {}

    def __init__ (self, win, lose):
        self.__win = win
        self.__lose = lose

    def getPlayerMove (self):
        return type(self).__name__

    def fight (self, opponentMove):
        if opponentMove in self.__win:
            return 1
        elif opponentMove in self.__lose:
            return -1
        else:
            return 0

# children
class Scissor (_Game):
    def __init__ (self):
        _Game.__init__(self, {'Paper'}, {'Rock'})

class Paper (_Game):
    def __init__ (self):
        _Game.__init__(self, {'Rock'}, {'Scissor'})

class Rock (_Game):
    def __init__ (self):
        _Game.__init__(self, {'Scissor'}, {'Paper'})

# factory
class GameFactory ():
    def generateMove (self):
        return random.choice(moveType)

    def getMoveFromFactory (self, type):
        moveClass = type.capitalize()
        return globals()[moveClass]() 