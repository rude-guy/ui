import loader from '@/loader';
import { require, define } from './amd';
import messageManager from '../messageManager';

class GlobalApi {
  constructor() {}

  init() {
    global.modRequire = require;
    global.modDefine = define;
    global.webkit = messageManager;
    window.Page = (moduleInfo) => {
      loader.createPageModule(moduleInfo);
    };
  }
}

export default new GlobalApi();
