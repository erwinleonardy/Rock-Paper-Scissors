# Filename: __init__.py
# Author: Erwin Leonardy
# Descrption: This file contains the configuration of our Flask web app

from flask import Flask

app = Flask(__name__, template_folder='./view', static_url_path='/static')
app.config.from_pyfile('flask.cfg')

from src.controller import routes