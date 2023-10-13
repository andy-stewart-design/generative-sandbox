import { setup } from "./utils/setup";
import { draw } from "./draw/periodic-function-03";
import { generateZip } from "./utils/zip";
import "./style.css";

const loop = true;
const saveFrames = true;
const [canvas, context] = setup();
const counter = document.querySelector("#elapsed-time");

const seconds = 6;
const framesPerSecond = 60;
const framesPerLoop = framesPerSecond * seconds;
const numLoops = 1;
const numFrames = framesPerLoop * numLoops;
let frameCount = 0;

function animate() {
  const frames = draw(canvas, context, frameCount, framesPerLoop);

  frameCount += 1;
  counter.innerHTML = (frameCount / framesPerSecond).toFixed(1);

  if (loop) {
    window.requestAnimationFrame(animate);
  } else {
    if (frameCount < numFrames) window.requestAnimationFrame(animate);
    else if (saveFrames) generateZip(frames);
  }
}

animate();

export { canvas, context };
