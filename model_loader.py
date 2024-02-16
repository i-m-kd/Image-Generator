class SingletonMeta(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]

class ModelLoader(metaclass=SingletonMeta):
    def __init__(self):
        self.model = self.load_model()

    def load_model(self):
        print("Loading the model...")
        model_path = "CompVis/stable-diffusion-v1-4"
        model = StableDiffusionPipeline.from_pretrained(model_path, revision="fp16", torch_dtype=torch.float16).to("cuda")
        print("Model loaded successfully.")
        return model

# Usage
model_loader = ModelLoader()
model_pipe = model_loader.model
