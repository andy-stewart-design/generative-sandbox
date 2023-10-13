import { context } from "../main";
const TWO_PI = Math.PI * 2;

export function circle(x, y, size) {
  context.beginPath();
  context.arc(x, y, size, 0, TWO_PI, false);
}
