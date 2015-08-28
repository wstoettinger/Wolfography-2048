"""`main` is the top level module for your Flask application."""

from google.appengine.ext import ndb

# Import the Flask Framework
from flask import Flask, g, session, redirect, url_for, escape, request, make_response, render_template

import markdown

from wg_model import Account
from wg_model import Article

# configuration
DEBUG = True

app = Flask(__name__)
app.config.from_object(__name__)
# Note: We don't need to call run() since our application is embedded within
# the App Engine WSGI application server.
  

@app.route('/')
def home():
    """Return a friendly HTTP greeting."""

    return render_template('index.html')


@app.route('/fotos')
@app.route('/fotos/<category>')
def fotos(category=None):
    return render_template('index.html', content="Fotos %s" % category)


@app.route('/workshops')
def workshops():
    return render_template('index.html', content="Workshops")


@app.route('/aktionstermine')
def aktionstermine():
    return render_template('index.html', content="Aktionstermine")


@app.route('/referenzen')
def referenzen():
    return render_template('index.html', content="Referenzen")


@app.route('/referenzen/kundenmeinungen')
def kundenmeinungen():
    return render_template('index.html')


@app.route('/preise')
def preise():
    temp = Article.query(Article.group=='fotos', Article.categories=='*').fetch(1)
    return render_template('index.html', content=markdown.markdown(temp[0].text))


@app.route('/kontakt')
def kontakt():
    """ test method to create an article """
    temp = Article(group='fotos',
        categories=['*','produkte'],
        title='test title')
    temp.text = '''some **markdown** text with breaks
    and new lines'''
    temp.put()
    return render_template('index.html', content="article put")


@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error."""
    return render_template('index.html'), 404


@app.errorhandler(500)
def application_error(e):
    """Return a custom 500 error."""
    return 'Sorry, unexpected error: {}'.format(e), 500
