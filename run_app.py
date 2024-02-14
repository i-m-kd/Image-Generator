import subprocess

# Command to start flask app and celery worker
flask_command = ["python", "app.py"]
celery_command = ["celery", "-A", "queue_task.celery", "worker", "-l", "info"]

# Start both flask app and celery worker
subprocess.Popen(flask_command)
subprocess.Popen(celery_command, detached=True)

