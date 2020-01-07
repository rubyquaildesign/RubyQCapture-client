import { CaptureClient } from '../dist/index.js';
let v: HTMLCanvasElement = document.getElementById(
  'testcanvas'
) as HTMLCanvasElement;
let x = new CaptureClient(4343, v);
v.width = 640;
v.height = 640;
const ctx = v.getContext('2d');
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, v.width, v.height);
x.start({ name: 'suzanne', lengthIsFrames: false, maxLength: 4 });
const render = (time: number) => {
  let cg = ctx.createLinearGradient(
    0.5 * v.width + -Math.cos(time) * 100 * Math.abs(Math.sin(time / 4)),
    0.5 * v.height + -Math.sin(time) * 100 * Math.abs(Math.sin(time / 4)),
    0.5 * v.width + Math.cos(time) * 100 * Math.abs(Math.sin(time / 4)),
    0.5 * v.height + Math.sin(time) * 100 * Math.abs(Math.sin(time / 4))
  );
  cg.addColorStop(0, '#37a6b708');
  cg.addColorStop(1, '#f383a206');
  ctx.fillStyle = cg;
  ctx.fillRect(0, 0, v.width, v.height);
  requestAnimationFrame(() => render(time + 2 * (Math.PI / 360)));
  x.capture();
};
requestAnimationFrame(() => render(0));
