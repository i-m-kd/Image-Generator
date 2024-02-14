from celery import Celery
import configparser

config = configparser.ConfigParser()
config.read('config/configurations.ini')

celery_broker_url = config.get('celery_worker', 'broker_url')
celery_result_backend = config.getint('celery_worker', 'result_backend')

def make_celery(app_name=__name__):
    celery_app = Celery(app_name, broker=celery_broker_url, backend=celery_result_backend)
    return celery_app

celery = make_celery()