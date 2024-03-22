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

  updateModule(opts) {
    const { id, data } = opts;
    const viewModule = this.uiInstance[id];
    for (const key in data) {
      Vue.set(viewModule, key, data[key]);
    }
  }

  makeVueOptions(opts) {
    const { path } = opts;
    const staticModule = loader.getModuleByPath(path);
    const self = this;

    return {
      _scopeId: staticModule.moduleInfo.scopeId,
      data() {
        return {
          ...staticModule.data,
        };
      },
      beforeCreate() {
        this._bridgeInfo = {
          id: self.pageId,
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
