import { map, dist, lerp } from "../utils/math";
import { circle } from "../utils/shapes";
import { easeInOutExpo } from "../utils/easings";

const TWO_PI = Math.PI * 2;
const COLOR_DARK = "#000033";
const COLOR_LIGHT = "#0022FF";
const COLOR_WHITE = "#DDDDFF";

let frames = [];

export function draw(canvas, context, frameCount, framesPerLoop, numLoops) {
  const width = canvas.width;
  const height = canvas.height;
  const t = frameCount / framesPerLoop;

  const loopIndex = Math.floor(t);
  const loopProgress = t - loopIndex;

  const posOff = 300;
  const positions = [
    { x: posOff, y: posOff },
    { x: width - posOff, y: posOff },
    { x: width - posOff, y: height - posOff },
    { x: posOff, y: height - posOff },
  ];

  context.clearRect(0, 0, width, height);
  context.fillStyle = loopIndex % 2 ? COLOR_DARK : COLOR_LIGHT;
  context.fillRect(0, 0, width, height);

  const fgProgress = easeInOutExpo(loopProgress);

  for (let i = 0; i < 4; i++) {
    const startPos = positions[(loopIndex + i) % numLoops];
    const endPos = positions[(loopIndex + i + 1) % numLoops];

    for (let j = 1; j < 7; j++) {
      const bgEaseOffset = map(
        Math.cos(TWO_PI * loopProgress),
        -1,
        1,
        1 - 0.03 * j,
        1
      );
      const bgProgress = easeInOutExpo(loopProgress * bgEaseOffset);
      const posX = lerp(startPos.x, endPos.x, bgProgress);
      const posY = lerp(startPos.y, endPos.y, bgProgress);
      context.fillStyle =
        loopIndex % 2 ? `${COLOR_LIGHT}22` : `${COLOR_WHITE}22`;
      circle(posX, posY, 100);
      context.fill();
    }

    const posX = lerp(startPos.x, endPos.x, fgProgress);
    const posY = lerp(startPos.y, endPos.y, fgProgress);
    context.fillStyle = loopIndex % 2 ? COLOR_LIGHT : COLOR_WHITE;
    circle(posX, posY, 100);

    context.fill();
  }

  frames.push(canvas.toDataURL());
  return frames;
}
