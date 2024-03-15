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
  }
}

export default new MessageManager();
