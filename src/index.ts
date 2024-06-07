import {
  Viewer,
  DefaultViewerParams,
  SpeckleLoader,
  MeasurementType,
} from "@speckle/viewer";
import { CameraController, MeasurementsExtension } from "@speckle/viewer";
import { makeMeasurementsUI } from "./MeasurementsUI";

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
  /** Add mesurements extension */
  const measurements = viewer.createExtension(MeasurementsExtension);

  /** Create a loader for the speckle stream */
  const loader = new SpeckleLoader(
    viewer.getWorldTree(),
    "https://latest.speckle.dev/streams/92b620fb17/objects/801360a35cd00c13ac81522851a13341",
    ""
  );
  /** Load the speckle data */
  await viewer.loadObject(loader, true);

  measurements.enabled = true;
  makeMeasurementsUI(viewer);
}

main();
