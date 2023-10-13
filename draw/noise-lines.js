import { createNoise3D } from "https://cdn.skypack.dev/simplex-noise@4.0.0";

const simplex = createNoise3D();
const TWO_PI = Math.PI * 2;
const noiseRadius = 1;

let frames = [];

export function draw(canvas, context, frameCount, numFrames) {
  const width = canvas.width;
  const height = canvas.height;
  const t = frameCount / numFrames;

  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.fillStyle = "#000000";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  context.strokeStyle = "#FFFFFF";
  context.lineWidth = 2;

  for (let y = 0; y < 10; y++) {
    context.beginPath();
    for (let x = 0; x <= width; x++) {
      const padding = 60;
      const activeArea =
        x >= padding && x <= width - padding
          ? 1 - Math.abs((x - padding) / ((width - padding * 2) / 2) - 1)
          : 0;

      const n = simplex(
        x / 200 + y * 10000,
        noiseRadius * Math.sin(TWO_PI * t),
        noiseRadius * Math.cos(TWO_PI * t)
      );
      const lY = (height / 2) * n * activeArea + width / 2;
      if (x === 0) context.moveTo(x, lY);
      else if (x > 0 && x < width) {
        context.lineTo(x, lY);
      } else {
        context.lineTo(x, lY);
        context.lineTo(width + 40, height / 2);
        context.lineTo(width + 40, height + 40);
        context.lineTo(-40, height + 40);
      }
    }

    context.stroke();
  }

  frames.push(canvas.toDataURL());
  return frames;
}
