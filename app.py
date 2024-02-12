# Import flask class
from flask import Flask, render_template, request, send_file, jsonify
import configparser

config = configparser.ConfigParser()
config.read('config/configurations.ini')

server_address = config.get('Server', 'address')
server_port = config.getint('Server', 'port')

app = Flask(__name__, static_url_path='/static', static_folder='static')

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':

        prompt = request.json['prompt']

        print("Input from user is", prompt)

        # image_path = "/static/images/sreenivasan_thenmavinkombathu.jpg"

        return jsonify({'image_url': f'/static/images/sreenivasan_thenmavinkombathu.jpg'})
    
    return render_template('index.html')


app.run(host=server_address, port=server_port)

