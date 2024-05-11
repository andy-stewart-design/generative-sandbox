import { map, dist, lerp } from "../utils/math";
import { circle } from "../utils/shapes";
import { createNoise4D } from "https://cdn.skypack.dev/simplex-noise@4.0.0";
import { easeInOutExpo } from "../utils/easings";

const simplex = createNoise4D();
const TWO_PI = Math.PI * 2;
const COLOR_DARK = "#000033";
const COLOR_LIGHT = "#0022FF";

let frames = [];

export function draw(canvas, context, frameCount, numFrames) {
  const width = canvas.width;
  const height = canvas.height;
  const t = frameCount / numFrames;

  const numLoops = Math.floor(t);
  const loopProgress = t - numLoops;

  const timeOffset = 0.275;
  const flipColors =
    loopProgress < 0 + timeOffset || loopProgress > 1 - timeOffset;

  context.clearRect(0, 0, width, height);
  context.fillStyle = flipColors ? COLOR_DARK : COLOR_LIGHT;
  context.fillRect(0, 0, width, height);
  context.fillStyle = flipColors ? COLOR_LIGHT : COLOR_DARK;

  const startSize = width;
  const endSize = width / 2;
  const padding = Math.abs(startSize - endSize) / 2;
  const freq = 30;
  const maxRadius = width / freq / 3;
  const minRadius = width / freq / 6;

  for (let i = 0; i <= freq; i++) {
    for (let j = 0; j <= freq; j++) {
      const start = { x: (i * startSize) / freq, y: (j * startSize) / freq };
      const end = {
        x: (i * endSize) / freq + padding,
        y: (j * endSize) / freq + padding,
      };

      const n =
        simplex(
          start.x * 0.0055,
          start.y * 0.0055,
          Math.cos(TWO_PI * t) * 0.05,
          Math.sin(TWO_PI * t) * 0.05
        ) * 0.25;
      // if (frameCount === 0) console.log(n);
      const maxDist = dist(0, 0, width / 2, height / 2);
      const offset =
        (dist(start.x * n, start.y * n, width / 2, height / 2) / maxDist) *
        0.175;

      const period = Math.cos(TWO_PI * (t - offset));
      const percentage = easeInOutExpo(map(period, -1, 1, 1, 0));

      const posX = lerp(start.x, end.x, percentage);
      const posY = lerp(start.y, end.y, percentage);
      const size = map(period, -1, 1, minRadius, maxRadius);

      circle(posX, posY, size);
      context.fill();
    }
  }

  frames.push(canvas.toDataURL());
  return frames;
}
