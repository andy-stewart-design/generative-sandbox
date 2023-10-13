import { map, dist } from "../utils/math";
import { circle } from "../utils/shapes";
const TWO_PI = Math.PI * 2;

let frames = [];
let imageData;

export function draw(canvas, context, frameCount, numFrames) {
  if (frameCount === 0) {
    imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  }

  const width = canvas.width;
  const height = canvas.height;
  const t = frameCount / numFrames;

  context.clearRect(0, 0, width, height);
  context.fillStyle = "#000000";
  context.fillRect(0, 0, width, height);
  context.fillStyle = "#0000FF";

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const offset = dist(x, y, width / 2, height / 2) * 0.002;
      const periodic = map(Math.sin(TWO_PI * (t - offset)), -1, 1, 1, 0);
      const i = (x + y * width) * 4;
      imageData.data[i + 0] = 0;
      imageData.data[i + 1] = 50 * periodic;
      imageData.data[i + 2] = 255 * periodic;
      imageData.data[i + 3] = 255;
    }
  }

  context.putImageData(imageData, 0, 0);

  frames.push(canvas.toDataURL());
  return frames;
}
