import loader from '@/loader';
import { require, define } from './amd';

class GlobalApi {
  constructor() {}

  init() {
    global.modRequire = require;
    global.modDefine = define;
    window.Page = (moduleInfo) => {
      loader.createPageModule(moduleInfo);
    };
  }
}

export default new GlobalApi();
