import message from '@/message';

class Loader {
  constructor() {
    this.staticModules = new Map();
  }

  loadResources(opts) {
    const { appId } = opts;
    const viewResourcePath = `/mini_resource/${appId}/view.js`;
    const styleResourcePath = `/mini_resource/${appId}/style.css`;
    const script = document.createElement('script');
    const link = document.createElement('link');

    Promise.all([
      this.loadStyleFile(link, styleResourcePath),
      this.loadScriptFile(script, viewResourcePath),
    ])
      .then(() => {
        message.send({
          type: 'uiResourceLoaded',
          body: {},
        });
      })
      .catch(() => {
        console.log('fail');
      });
  }

  loadStyleFile(link, path) {
    return new Promise((resolve) => {
      link.href = path;
      link.rel = 'stylesheet';
      link.onload = () => {
        resolve();
      };
      document.body.appendChild(link);
    });
  }

  loadScriptFile(script, path) {
    return new Promise((resolve) => {
      script.src = path;
      script.onload = () => {
        resolve();
      };
      document.body.appendChild(script);
    });
  }
}

export default new Loader();
