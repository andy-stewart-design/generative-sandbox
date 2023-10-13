import { map, dist, lerp } from "../utils/math";
import { circle } from "../utils/shapes";
import { createNoise4D } from "https://cdn.skypack.dev/simplex-noise@4.0.0";
import { easeInOutExpo } from "../utils/easings";

const simplex = createNoise4D();
const TWO_PI = Math.PI * 2;

let frames = [];

export function draw(canvas, context, frameCount, numFrames) {
  const width = canvas.width;
  const height = canvas.height;
  const t = frameCount / numFrames;

  context.clearRect(0, 0, width, height);
  context.fillStyle = "#000033";
  context.fillRect(0, 0, width, height);
  context.fillStyle = "#0022FF";

  const startSize = width;
  const endSize = width / 2;
  const padding = Math.abs(startSize - endSize) / 2;
  const freq = 30;

  for (let i = 0; i <= freq; i++) {
    for (let j = 0; j <= freq; j++) {
      const start = { x: (i * startSize) / freq, y: (j * startSize) / freq };
      const end = {
        x: (i * endSize) / freq + padding,
        y: (j * endSize) / freq + padding,
      };

      const n =
        simplex(
          start.x,
          start.y,
          Math.sin(TWO_PI * t) * 0.001,
          Math.cos(TWO_PI * t) * 0.001
        ) * 0.25;
      const maxDist = dist(0, 0, width / 2, height / 2);
      const offset =
        (dist(start.x * n, start.y * n, width / 2, height / 2) / maxDist) *
        0.175;

      // if (frameCount === 0) console.log(offset / maxDist);

      const period = Math.cos(TWO_PI * (t - offset));
      const percentage = easeInOutExpo(map(period, -1, 1, 1, 0));

      const posX = lerp(start.x, end.x, percentage);
      const posY = lerp(start.y, end.y, percentage);
      const size = map(period, -1, 1, 5, 10);

      circle(posX, posY, size);
      context.fill();
    }
  }

  frames.push(canvas.toDataURL());
  return frames;
}
