import message from '@/message';
import loader from '../loader';
import runtimeManager from '../runtimeManager';
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
      const { pagePath, bridgeId } = msg;
      loader.setInitialData(msg.initialData);
      runtimeManager.firstRender({
        pagePath,
        bridgeId,
      });
    });
    this.message.receive('updateModule', (msg) => {
      runtimeManager.updateModule(msg);
    });
  }
}

export default new MessageManager();
