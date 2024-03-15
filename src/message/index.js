import mitt from 'mitt';

class Message {
  constructor() {
    this.event = new mitt();
    this.init();
  }
  init() {
    window.JSBridge.onReceiveNativeMessage = (msg) => {
      const { type, body } = msg;

      this.event.emit(type, body);
    };
  }
  // 接收原生层发送的消息
  receive(type, handler) {
    this.event.on(type, handler);
  }

  // 向原生层发送消息
  send(msg) {
    window.JSBridge.onReceiveUIMessage(msg);
  }
}

export default new Message();
