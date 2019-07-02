# Filename: test.py
# Author: Erwin Leonardy
# Descrption: This file serves as the automated test cases for the controller class

import unittest, sys, traceback, mock
from src.controller.controller import Controller

class Test(unittest.TestCase):
    def testProgram(self):
        try:
            rv = Controller.playGame('Player', 'Scissor', 'Scissor')
            assert ('It is a draw!', 'Scissor', 'Scissor') == rv, "Scissor and Scissor is a draw!" 

            rv = Controller.playGame('Player', 'Scissor', 'Rock')
            assert ('Player lost!', 'Scissor', 'Rock') == rv, "Rock breaks the scissor!" 

            rv = Controller.playGame('Player', 'Scissor', 'Paper')
            assert ('Player won!', 'Scissor', 'Paper') == rv, "Scissor cuts the paper!" 

            rv = Controller.playGame('Player 2', 'Paper', 'Rock')
            assert ('Player 2 won!', 'Paper', 'Rock') == rv, "Paper wraps the rock!" 

            rv = Controller.playGame('Player')
            assert (mock.ANY, mock.ANY, mock.ANY) == rv, "Random moves should be generated for both Player and Computer 1!" 

            rv = Controller.playGame('Player', 'Rock')
            assert (mock.ANY, mock.ANY, mock.ANY) == rv, "A random move should be generated for Computer 1!" 

            return "Passes all checks!"
            
        except AssertionError as e:
            return str(e.args)
