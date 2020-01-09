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
  socket: SocketIOClient.Socket;
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
    let pm = new Promise((res, reg) => {
      this.socket.emit('capture', this.canvas.toDataURL(), () => {
        res();
      });
    });
    return pm;
  }
}

export default CaptureClient;
