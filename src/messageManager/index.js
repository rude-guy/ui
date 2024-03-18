import message from '@/message';
import loader from '../loader';

class MessageManager {
  constructor() {
    this.message = message;
  }

  init() {
    this.message.receive('loadResource', (msg) => {
      const { appId } = msg;
      loader.loadResources({
        appId,
      });
    });
    this.message.receive('setInitialData', (msg) => {
      loader.setInitialData(msg.initialData);
    });
  }
}

export default new MessageManager();
