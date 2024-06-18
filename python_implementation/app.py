import asyncio
import fal_client
import os
import gradio as gr
from PIL import Image



async def submit(image_path, prompt, seed):
    handler = await fal_client.submit_async(
        "comfy/lukegehron/speckle_ai",
        arguments={
            "ksampler_seed": seed,
            "cliptextencode_text": prompt+" RAW Photo, high end, 8k, film grain, high quality, fujifilm, dramatic sky, architecture rendering",
            "image_load_image_path": f"data:image/png;base64,{image_path}"
        },
    )
    result = await handler.get()
    return result

def get_url(results):
    url = results['outputs'][list(results['outputs'].keys())[0]]['images'][0]['url']
    nm = results['outputs'][list(results['outputs'].keys())[0]]['images'][0]['filename']
    return f"![{nm}]({url})"


def render_image(api_key, image_path, prompt, seed):
    os.environ["FAL_KEY"] = api_key
    results = asyncio.run(submit(image_path, prompt, int(seed)))
    url = get_url(results)
    img = Image.open(image_path)
    return img, url


demo = gr.Interface(render_image, inputs=[gr.Textbox(label="API key", type="password", value="fal-******************"), gr.File(label="PNG Image"), gr.Textbox(label="Prompt", info="Specify how you would like the image generation to be", value="RAW Photo, high end, 8k, film grain, high quality, fujifilm, dramatic sky, architecture rendering"),  gr.Textbox(label="Seed", info="Pass your seed here (if not interested, leave it as it is)", value="123498235498246")], outputs=[gr.Image(label="Your Speckle Model"), gr.Markdown(label="Generated Image")], title="Speckle AI")

if __name__=="__main__":
    demo.launch(server_name="0.0.0.0", server_port=7860)