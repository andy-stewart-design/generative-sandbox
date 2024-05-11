import { map, dist, lerp, shuffle } from "../utils/math";
import { circle } from "../utils/shapes";
import { easeInOutExpo } from "../utils/easings";

const TWO_PI = Math.PI * 2;
const COLOR_DARK = "#000033";
const COLOR_LIGHT = "#0022FF";
const COLOR_WHITE = "#DDDDFF";

let frames = [];
let keyframes = [];

export function draw(canvas, context, frameCount, framesPerLoop, numLoops) {
  const width = canvas.width;
  const height = canvas.height;
  const t = frameCount / framesPerLoop;

  const loopIndex = Math.floor(t);
  const loopProgress = t - loopIndex;

  const grid = 60;
  const cell = width / (grid + 1);
  const positions = Array.from(Array(grid), (_, i) => cell * i + cell);

  const positions2D = positions
    .map((posX) => {
      return positions.map((posY) => [posX, posY]);
    })
    .flat();

  context.clearRect(0, 0, width, height);
  context.fillStyle = COLOR_DARK;
  context.fillRect(0, 0, width, height);
  context.fillStyle = COLOR_LIGHT;

  if (keyframes.length === 0) {
    keyframes = [
      positions2D,
      shuffle([...positions2D]),
      shuffle([...positions2D]),
      shuffle([...positions2D]),
      shuffle([...positions2D]),
      shuffle([...positions2D]),
      shuffle([...positions2D]),
      shuffle([...positions2D]),
    ];
  }

  positions2D.forEach((_, index) => {
    const startPos = keyframes[loopIndex % numLoops][index];
    const endPos = keyframes[(loopIndex + 1) % numLoops][index];
    const hue = (80 / positions2D.length) * index + 160;

    context.fillStyle = `hsl(${hue}, 100%, 50%)`;
    const posX = lerp(startPos[0], endPos[0], easeInOutExpo(loopProgress));
    const posY = lerp(startPos[1], endPos[1], easeInOutExpo(loopProgress));
    circle(posX, posY, width / (grid * 2.25));
    context.fill();
  });

  //   console.log(positions2D.flat());
  // }

  // for (let i = 0; i < positions.length; i++) {
  //   const startPos = keyframes[loopIndex % numLoops][i];
  //   const endPos = keyframes[(loopIndex + 1) % numLoops][i];
  //   const hue = (255 / positions.length) * i;

  //   const pos = lerp(startPos, endPos, easeInOutExpo(loopProgress));
  //   context.fillStyle = `hsl(${hue}, 100%, 50%)`;
  //   circle(pos, height / 2, 40);
  //   context.fill();
  // }

  frames.push(canvas.toDataURL());
  return frames;
}
