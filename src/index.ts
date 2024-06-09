import {
  Viewer,
  DefaultViewerParams,
  SpeckleLoader,
  ViewerEvent,
  // SpeckleDepthMaterial
} from "@speckle/viewer";
import { CameraController } from "@speckle/viewer";
import { makeInputsUI } from "./InputsUI";
import * as fal from "@fal-ai/serverless-client";



async function runFAL() {

  fal.config({
    credentials: "YOUR_KEY_HERE",
    proxyUrl: '/api/fal/proxy', // the built-int nextjs proxy
    // proxyUrl: 'http://localhost:1234/api/fal/proxy', // or your own external proxy
  });

  const result = await fal.subscribe("comfy/lukegehron/speckle_ai", {
  input: {
    ksampler_seed: 123498235498246,
    cliptextencode_text: "RAW Photo of a american house, high end, typical northeastern suburb, summer, exterior, early afternoon, 8k, film grain, high quality, fujifilm, dramatic sky, classic french countryside style, architecture rendering,",
    image_load_image_path: "", 
  },
  logs: false,
});
  console.log(result);
}

console.log("Starting FAL");
runFAL(); 

async function main() {
  /** Get the HTML container */
  const container = document.getElementById("renderer") as HTMLElement;

  /** Configure the viewer params */
  const params = DefaultViewerParams;
  console.log(params)
  params.verbose = true;


  /** Create Viewer instance */
  const viewer = new Viewer(container, params);
  /** Initialise the viewer */
  await viewer.init();
  

  /** Add the stock camera controller extension */
  viewer.createExtension(CameraController);

  /** Create a loader for the speckle stream */
  const loader = new SpeckleLoader(
    viewer.getWorldTree(),
    "https://latest.speckle.dev/streams/92b620fb17/objects/801360a35cd00c13ac81522851a13341",
    // "https://app.speckle.systems/streams/eda93f4cb6/objects/8798429cec15e9bc5f6085f980ea272a",
    ""
  );
  
  /** Load the speckle data */
  await viewer.loadObject(loader, true);

  async function displayImage() {
    let result = await viewer.screenshot();
    document.getElementById('image').src = result;
    console.log(result)
}
  viewer.on(ViewerEvent.ObjectClicked, (event) => {
    displayImage()
  }
  )

  ViewerEvent.ObjectClicked
  makeInputsUI(viewer);

  setTimeout(() => {

  viewer.resize()
    let myScreenshot = viewer.screenshot();
  console.log(myScreenshot)

  }, 1000);
}

main();
