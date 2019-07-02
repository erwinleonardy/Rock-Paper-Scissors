# Filename: routes.py
# Author: Erwin Leonardy
# Descrption: This file declares the RESTful endpoints of our web application

from flask import render_template, request, session
from src import app
from src.model.model import moveType
from src.controller.controller import Controller
from src.controller.test import Test

@app.route('/', methods=['GET', 'POST'])
def index():
    # execute this when the client first joins the game through the 'GET' method
    if request.method == 'GET':
        session.clear()
        session['opponent'] = "Computer 1"
        session['round'] = 1
        session['p1Win'] = 0
        session['p2Win'] = 0

        # show the main menu
        return render_template('main.html')

    # subsequent requests would be done through the 'POST' method
    else:
        response = request.form['option']
        
        # navigate to the page that show the available moves
        if response == 'Player' or response == 'Computer 2':
            session['player'] = response    # store player name (i.e. Player / Computer 2)
            return render_template('battle.html', player=response)

        # navigate to the page to show the winner
        elif response in moveType:
            result, _, opponentMove = Controller.playGame(session['player'], response) 
            return render_template('result.html', result=result, playerMove=response, opponentMove=opponentMove) 

        # random (comp vs. comp)
        else:
            result, playerMove, opponentMove = Controller.playGame(session['player']) 
            return render_template('result.html', result=result, playerMove=playerMove, opponentMove=opponentMove) 

@app.route('/test', methods=['GET'])
def test():
    test = Test()
    return test.testProgram()