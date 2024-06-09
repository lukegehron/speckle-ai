import {
  IViewer,
} from "@speckle/viewer";
import { Pane } from "tweakpane";

export const inputParams = {
  // type: MeasurementType.POINTTOPOINT,
  // vertexSnap: true,
  // units: "m",
  // precision: 2,
  // visible: true,
  // enabled: true,
  seed: 7482035931,
  prompt: "american house, \nnortheast suburb, \nsummer, \nexterior, \nearly afternoon,  \nclassic style, ",
};

//RAW Photo, high end, 8k, film grain, high quality, fujifilm, dramatic sky, architecture rendering,

export function makeInputsUI(viewer: IViewer) {
  // const measurementsExtension = viewer.getExtension(
  //   MeasurementsExtension
  // ) as MeasurementsExtension;
  const pane = new Pane({ title: "AI Inputs", expanded: true,  });
  // pane
  //   .addInput(inputParams, "enabled", {
  //     label: "Enabled",
  //   })
  //   .on("change", () => {
  //     measurementsExtension.enabled = inputParams.enabled;
  //   });
  // pane
  //   .addInput(inputParams, "visible", {
  //     label: "Visible",
  //   })
  //   .on("change", () => {
  //     measurementsExtension.options = inputParams;
  //   });
  // pane
  //   .addInput(inputParams, "type", {
  //     label: "Type",
  //     options: {
  //       PERPENDICULAR: MeasurementType.PERPENDICULAR,
  //       POINTTOPOINT: MeasurementType.POINTTOPOINT,
  //     },
  //   })
  //   .on("change", () => {
  //     measurementsExtension.options = inputParams;
  //   });
  pane
    .addBinding(inputParams, "prompt", {
      label: "Prompt",
      readonly: false,
        multiline: true,
        lineCount: 6,
      });
    // .on("change", () => {
    //   // measurementsExtension.options = inputParams;
    //   console.log('hello3')
    // });

  pane
    .addBinding(inputParams, "seed", {
      label: "Seed",
      step: 1,
      // options: Units,
    })
    .on("change", () => {
      // measurementsExtension.options = inputParams; 
      console.log('hello2')
    });
  // pane
  //   .addInput(inputParams, "precision", {
  //     label: "Precision",
  //     step: 1,
  //     min: 1,
  //     max: 5,
  //   })
  //   .on("change", () => {
  //     // measurementsExtension.options = inputParams;
  //     console.log('hello1')
  //   });
  pane
    .addButton({
      title: "Update Image",
    })
    .on("click", () => {
      console.log('hi');
    });
  // pane
  //   .addButton({
  //     title: "Delete All",
  //   })
  //   .on("click", () => {
  //     measurementsExtension.clearMeasurements();
  //   });
}
