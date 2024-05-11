import { setup } from "./utils/setup";
import { draw } from "./draw/keyframe-test-02";
import { generateZip } from "./utils/zip";
import "./style.css";

const loop = false;
const saveFrames = true;
const [canvas, context] = setup();
const counter = document.querySelector("#elapsed-time");

const secondsPerLoop = 2;
const framesPerSecond = 60;
const framesPerLoop = framesPerSecond * secondsPerLoop;
const numLoops = 8;
const numFrames = framesPerLoop * numLoops;
let frameCount = 0;

function animate() {
  const frames = draw(canvas, context, frameCount, framesPerLoop, numLoops);

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
