import { map, dist } from "../utils/math";
const TWO_PI = Math.PI * 2;

let frames = [];

export function draw(canvas, context, frameCount, numFrames) {
  const width = canvas.width;
  const height = canvas.height;
  const t = frameCount / numFrames;
  const m = 19;

  context.clearRect(0, 0, width, height);
  context.fillStyle = "#000000";
  context.fillRect(0, 0, width, height);
  context.fillStyle = "#0000FF";

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < m; j++) {
      const x = map(i, 0, m - 1, 0, width);
      const y = map(j, 0, m - 1, 0, height);

      const distanceFromCenter = 0.002 * dist(x, y, width / 2, height / 2);
      const period = Math.sin(TWO_PI * (t - distanceFromCenter));
      const size = map(period, -1, 1, 4, 30);

      context.beginPath();
      context.arc(x, y, size, 0, TWO_PI, false);
      context.fill();
    }
  }

  frames.push(canvas.toDataURL());
  return frames;
}
