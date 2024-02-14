from .celery_config import celery
import time


@celery.task(bind=True)
def generate_image(self, prompt):
    # Image generation logic here...

    time.sleep(10)
    return #path to generated image
