# Import flask class
from flask import Flask, render_template, request, jsonify
import configparser
from queue_task import generate_image

# Configuration
config = configparser.ConfigParser()
config.read('config/configurations.ini')

server_address = config.get('Server', 'address')
server_port = config.getint('Server', 'port')

app = Flask(__name__, static_url_path='/static', static_folder='static')

@app.route('/')
def index():
    return render_template('index.html')
 
@app.route('/generate', methods=['POST'])
def generate():
        prompt = request.json['prompt']
        task = generate_image.delay(prompt)        
        return jsonify({'task_id': task.id}), 202
    

@app.route('/status/<task_id>', methods=['GET'])
def task_status(task_id):
    task_result = generate_image.AsyncResult(task_id)
    if task_result.state == 'PENDING':
        response = {'state': task_result.state, 'status': 'Processing...'}
    elif task_result.state == 'SUCCESS':
        response = {'state': task_result.state, 'result': task_result.result}
    else:
        # Handle failure or other states if necessary
        response = {'state': task_result.state, 'status': 'An error occurred.'}
    return jsonify(response)

if __name__ == '__main__':
    app.run(host=server_address, port=server_port)

