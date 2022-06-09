import * as io from 'socket.io-client';
interface startArguments {
  frameRate?: number;
  maxLength?: number;
  lengthIsFrames?: boolean;
  name?: string;
}
export class CaptureClient {
  width: number = 0;
  height: number = 10;
  canvas: HTMLCanvasElement;
  socket: io.Socket;
  constructor(port: number, cvs: HTMLCanvasElement) {
    this.socket = io.connect(`http://localhost:${port}`);
    this.socket.on('connect', () => console.log(`connected to server`));
    this.canvas = cvs;
    this.width = cvs.width;
    this.height = cvs.height;
  }
  start(opt: startArguments) {
    this.socket.emit(
      'start',
      {
        ...opt,
        width: this.width,
        height: this.height,
      },
      () => console.log(`animation started`)
    );
  }
  capture() {
    let pm = new Promise<void>((resolve, reg) => {
      this.socket.emit('capture', this.canvas.toDataURL(), () => {
        resolve();
      });
    });
    return pm;
  }
  stop(save:boolean = true) {
    let promise = new Promise<void>((resolve, reject) => {
      
      this.socket.emit('stop', save, () => {
        resolve()
      })
    })
    return promise
  }
}

export default CaptureClient;
