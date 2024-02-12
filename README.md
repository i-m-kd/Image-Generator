# Trying to generate image from text 

- Deep learning model used is ==Stable Diffusion== 

#### Diffusion model
: Diffusion Models are generative models, meaning that they are used to generate data similar to the data on which they are trained.
Diffusion Models work by destroying training data through the successive addition of Gaussian noise, and then learning to recover the data by reversing this noising process. After training, we can use the Diffusion Model to generate data by simply passing randomly sampled noise through the learned denoising process.



## Speed optimization

1. Instead of using float32 precision try to load the model with a float16 precision.
2. Run simple inference steps, default is 50 try to run it with less that that.
- To do that we're using a more efficent denposing scheduler

## Space optimization

- memory is taken up by the cross-attention layers. Instead of running this operation in batch, one can run ()                       