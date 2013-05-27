from __future__ import with_statement
from logicwebapp import app, db
from flask import render_template, request

from contextlib import closing

@app.route("/")
def index():
	return render_template("index.html")

@app.route("/builder")
def builder():
	return render_template("builder.html")

@app.route("/viewer")
def viewer():
	return render_template("viewer.html")

@app.route("/save", methods=['POST'])
def save():
	with closing(db.connect_db()) as database:
		with closing(database.cursor()) as cursor:

			#return request.form['chipToSave']
			cursor.execute("INSERT into designs (jsonStorage) VALUES (?)",(request.form['chipToSave'],))
			database.commit()

			return str(cursor.lastrowid)

@app.route("/open/<designid>")
def open(designid):
	if not designid.isdigit():
		return '{ "error": "Invalid ID" }'

	with closing(db.connect_db()) as database:
		with closing(database.cursor()) as cursor:
			cursor.execute("SELECT jsonStorage FROM designs WHERE id=?", (int(designid),))
			database.commit()

			result = cursor.fetchone()
			if result is None:
				return '{ "error" : "No design with this ID"}'

			return result[0]


