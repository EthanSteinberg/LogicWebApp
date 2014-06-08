from flask import Flask, render_template

app = Flask(__name__)
app.config['DATABASE'] = "temp.db"

import logicwebapp.views
  
