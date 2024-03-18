import loader from '../loader';
import message from '../message';

class RuntimeManager {
  constructor() {
    this.page = null;
    this.pageId = '';
    this.uiInstance = {};
  }

  firstRender(opts) {
    const { pagePath, bridgeId } = opts;
    const options = this.makeVueOptions({
      path: pagePath,
      bridgeId,
    });
    const root = document.querySelector('#root');
    this.pageId = bridgeId;
    this.page = new Vue(options).$mount();
    root.appendChild(this.page.$el);
    root.addEventListener(
      'scroll',
      () => {
        message.send({
          type: 'pageScroll',
          body: {
            id: bridgeId,
            scrollTop: root.scrollTop,
          },
        });
      },
      false
    );
  }

  makeVueOptions(opts) {
    const { path, bridgeId } = opts;
    const staticModule = loader.getModuleByPath(path);
    const self = this;

    return {
      data() {
        return {
          ...staticModule.data,
        };
      },
      created() {
        self.uiInstance[self.pageId] = this;
        message.send({
          type: 'moduleCreated',
          body: {
            id: self.pageId,
            path,
          },
        });
      },
      mounted() {
        self.uiInstance[self.pageId] = this;
        message.send({
          type: 'moduleMounted',
          body: {
            id: self.pageId,
          },
        });
      },
      render: staticModule.moduleInfo.render,
    };
  }
}

export default new RuntimeManager();
