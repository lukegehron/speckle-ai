import {
  Viewer,
  DefaultViewerParams,
  SpeckleLoader,
  ViewerEvent,
  IViewer
} from "@speckle/viewer";
import { CameraController } from "@speckle/viewer";
import * as fal from "@fal-ai/serverless-client";
import { Pane } from "tweakpane";

export const inputParams = {
  api: "",
  seed: 7482035931,
  prompt: "american house, northeast suburb, summer, exterior, early afternoon,  classic style",
};

let aiApi = 'your_api_key';
let aiSeed = 7482035931;
let aiPromptText = "american house, northeast suburb, summer, exterior, early afternoon,  classic style, ";
let image = "";
//RAW Photo, high end, 8k, film grain, high quality, fujifilm, dramatic sky, architecture rendering,

function makeInputsUI(viewer: IViewer) {
  const pane = new Pane({ title: "AI Inputs", expanded: true,  });
  pane
    .addBinding(inputParams, "prompt", {
      label: "Prompt",
      readonly: false,
      }).on("change", () => {
        aiPromptText = inputParams.prompt; 
      });


    pane.addBinding(inputParams, "api", {
      label: "API Key",
      readonly: false,
      }) .on("change", () => {
        aiApi = inputParams.api; 
      });

      // pane.addBinding(inputParams, "speckle", {
      // label: "Speckle Stream",
      // readonly: false,
      // });
  pane.addBinding(inputParams, "seed", {
      label: "Seed",
      step: 1,
    })
    .on("change", () => {
      aiSeed = inputParams.seed; 
    });

  pane.addButton({
      title: "Update Image",
    })
    .on("click", () => {
      runFAL();
    });
  }



async function runFAL() {
  fal.config({
    credentials: aiApi,
  });

  const result = await fal.subscribe("comfy/lukegehron/speckle_ai", {
    input: {
      ksampler_seed: aiSeed,
      cliptextencode_text: aiPromptText + ", RAW Photo, high end, 8k, film grain, high quality, fujifilm, dramatic sky, architecture rendering",
      image_load_image_path: image,
    },
    logs: false,
  });
  document.getElementById('image').src = result.outputs[51].images[0].url;
}


async function main() {
  /** Get the HTML container */
  const container = document.getElementById("renderer") as HTMLElement;

  /** Configure the viewer params */
  const params = DefaultViewerParams;
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
    ""
  );
  
  /** Load the speckle data */
  await viewer.loadObject(loader, true);

  async function displayImage() {
    image = await viewer.screenshot();
    document.getElementById('image').src = image;
}
  viewer.on(ViewerEvent.ObjectClicked, (event) => {
    displayImage()
  }
  )

  ViewerEvent.ObjectClicked
  makeInputsUI(viewer);

  setTimeout(() => {

  viewer.resize()

  }, 1000);
}

main();
