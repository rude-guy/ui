export class PageModule {
  constructor(moduleInfo) {
    this.type = 'page';
    this.moduleInfo = moduleInfo;
    this.data = {};
  }

  setInitialData(data) {
    this.data = data;
  }
}
