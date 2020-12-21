import { App } from "vue";
import VueVirtualScroller from "./vue-virtual-scroll.vue";

export { VueVirtualScroller };

const plugin = {
  install(Vue: App) {
    Vue.component(`vue-virtual-scroller`, VueVirtualScroller);
  }
};

export default plugin;

if (window.Vue) {
  window.Vue.use(plugin);
}

declare global {
  interface Window {
    Vue: App;
  }
}
