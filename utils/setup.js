export function setup({
  selector = "canvas",
  scale = 3,
  displaySize = 400,
} = {}) {
  const canvas = document.querySelector(selector);

  canvas.style.width = displaySize * 1.5 + "px";
  canvas.style.height = displaySize * 1.5 + "px";
  canvas.width = displaySize * scale;
  canvas.height = displaySize * scale;

  const context = canvas.getContext("2d");

  return [canvas, context];
}
