import message from '@/message';

class MessageManager {
  constructor() {
    this.message = message;
  }

  init() {
    this.message.receive('test_ui', (msg) => {
      console.log('渲染线程接收到 test消息', msg);
    });

    setTimeout(() => {
      this.message.send({
        type: 'test_ui2',
        body: {
          data: 'test_ui2 消息',
        },
      });
    }, 2000);
  }
}

export default new MessageManager();
