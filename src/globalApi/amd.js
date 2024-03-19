var defineCache = {}; // 缓存已定义的模块
var requireCache = {}; // 缓存已加载的模块
var loadingModules = {};

// 模块定义函数
export function define(id, factory) {
  if (!defineCache[id]) {
    var module = {
      id: id,
      dependencies: [],
      factory: factory,
    };
    defineCache[id] = module;
  }
}

// 模块加载函数
export function require(id) {
  if (loadingModules[id]) {
    return {}; // 直接返回，尽管它可能还没有完全被加载
  }

  if (!requireCache[id]) {
    var mod = defineCache[id];
    if (!mod) throw new Error('No module defined with id ' + id);

    var module = {
      exports: {},
    };
    loadingModules[id] = true;
    var factoryArgs = [require, module.exports, module];

    mod.factory.apply(null, factoryArgs);
    requireCache[id] = module.exports;
    delete loadingModules[id];
  }
  return requireCache[id];
}
