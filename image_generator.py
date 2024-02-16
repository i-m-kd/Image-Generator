import os
# import time
from celery_config import celery
from model_loader import model_pipe
from datetime import datetime

@celery.task(bind=True)
def generate_image(self, prompt):
    try:
        # Ensure global model_pipe is not None and is ready
        if model_pipe is not None:
            image = model_pipe(prompt=prompt).images[0]
            
            # Save the generated image to a unique path
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            filename = f"generated_image_{timestamp}.png"
            output_path = os.path.join('/output', filename)
            image.save(output_path)
            
            # time.sleep(5)
            return {"image_path": output_path}
        else:
            return {"error": "Model not loaded."}
    except Exception as e:
        # Log the exception for debugging purposes
        self.retry(exc=e, countdown=10, max_retries=3)
        return {"error": str(e)}
