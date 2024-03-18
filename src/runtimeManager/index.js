import { uuid } from '@/utils/util';
import loader from '../loader';

class RuntimeManager {
  constructor() {
    this.page = null;
    this.pageId = `page_${uuid()}`;
  }

  firstRender(opts) {
    const { pagePath, bridgeId } = opts;
    const options = this.makeVueOptions({
      path: pagePath,
      bridgeId,
    });
    const root = document.querySelector('#root');
    this.page = new Vue(options).$mount();
    root.appendChild(this.page.$el);
  }

  makeVueOptions(opts) {
    const { path, bridgeId } = opts;
    const staticModule = loader.getModuleByPath(path);

    return {
      data() {
        return {
          ...staticModule.data,
        };
      },
      created() {
        console.log('created');
      },

      render: staticModule.moduleInfo.render,
    };
  }
}

export default new RuntimeManager();
