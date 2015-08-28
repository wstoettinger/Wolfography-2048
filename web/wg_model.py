"""The NDB data Model for the App """

from google.appengine.ext import ndb


class Article(ndb.Model):
  title = ndb.StringProperty('t') 
  group = ndb.StringProperty('g') 
  categories = ndb.StringProperty('c', repeated=True) 
  text = ndb.TextProperty()


class Image(ndb.Model):
  title = ndb.StringProperty() 

class Account(ndb.Model):
  username = ndb.StringProperty()
  userid = ndb.IntegerProperty()
  email = ndb.StringProperty()