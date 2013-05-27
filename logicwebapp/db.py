from __future__ import with_statement
from contextlib import closing

import os
import sqlite3
from logicwebapp import app

def delete_db():
	try:
		os.remove(app.config['DATABASE'])
	except:
		pass

def connect_db():
	return sqlite3.connect(app.config['DATABASE'])

def init_db():
    with closing(connect_db()) as db:
        with app.open_resource('schema.sql') as f:
            db.cursor().executescript(f.read())
        db.commit()