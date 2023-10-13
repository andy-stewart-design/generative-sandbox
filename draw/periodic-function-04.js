import { map, dist } from "../utils/math";
import { circle } from "../utils/shapes";
import { easeInOutExpo } from "../utils/easings";

const TWO_PI = Math.PI * 2;

let frames = [];

export function draw(canvas, context, frameCount, numFrames) {
  const width = canvas.width;
  const height = canvas.height;
  const t = frameCount / numFrames;

  context.clearRect(0, 0, width, height);
  context.fillStyle = "#000022";
  context.fillRect(0, 0, width, height);
  context.fillStyle = "#0000FF";

  const offset = map(Math.sin(TWO_PI * t), -1, 1, 1, 0);
  const speed = easeInOutExpo(offset);
  const posX = width * speed;

  circle(posX, height / 2, 50);
  context.fill();

  frames.push(canvas.toDataURL());
  return frames;
}
