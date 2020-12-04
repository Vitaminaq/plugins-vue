### 简介：对之前vue-lazy-store的升级兼容vue 3.0，以及支持typescript。
### Intro: Vue 3.0 state management plug-in,Simple version of vuex，support typescript。  
[![https://img.shields.io/npm/v/vue-store-next.svg?label=vue-store-next](https://img.shields.io/npm/v/vue-store-next.svg?label=vue-store-next)](https://www.npmjs.com/package/vue-store-next)  ![总下载量](https://img.shields.io/npm/dt/vue-store-next)

#### 安装/Install
``` bash
npm/cnpm install vue-store-next --save / yarn add vue-store-next
```

#### 使用/Use
使用方法跟vuex类似，基本可以无缝切换.  
Similar to vuex, it can be switched seamlessly.
##### store-ts
``` javascript
// src/store/index
import VueLazy from 'vue-store-next';
Vue.use(VueLazy);

class Text1 {
        public count: number = 0;
        public add(): number {
                return count ++;
        }
}

class BaseStore extends VueLazy.Store {
        public text1: Text1;
        public constructor() {
                super();
                this.text1 = new Text1();
                // 请在最后面激活store / Activate store at the end
                this.init();
        }
}

// ssr
export default BaseStore;
// csr
export default new BaseStore();

declare module 'vue/types/vue' {
	    interface Vue {
		        $store: BaseStore;
	    }
}

declare module 'vue/types/options' {
	    interface ComponentOptions<V extends Vue> {
		        store?: BaseStore;
	    }
}
```
##### store-js
```javascript
import Vue from "vue";
import VueLazy from "vue-lazy-store";
Vue.use(VueLazy);

const text1 = {
        count: 0,
	add() {
		this.count++;
	}
}
const store = new VueLazy.Store({
	text1
});
store.init();

export default store;
```
##### .vue-ts
``` javascript
// support ts
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component<LocalVue>({})
export default class LocalVue extends Vue {
        public get text1 () {
                return this.$store.text1;
        }
        public get count() {
               return this.text1.count; // 0
        }
        public mounted() {
                this.text1.add();
                console.log(this.count); // 1;
        }
}
```
##### .vue-js
``` javascript
computed: {
	text1() {
		return this.$store.text1;
	},
	count() {
		return this.text1.count;
	}
},
mounted() {
        this.text1.add();
	console.log(this.count); // 1;
}
```

#### ssr客户端接管状态 / ssr client takeover state
``` javascript
if (window.__INITIAL_STATE__) {
	store.replace(window.__INITIAL_STATE__);
 }
```
### tips
状态变更上不像vuex那样严谨，需要commit状态为true时，才能更新。但是使用起来非常简单，
而且支持class写，进而完全支持ts，欢迎进一步完善。  
State changes are not as rigorous as vuex, and they need to be true before they can be updated. But it's very simple to use. 
And support class writing, and then fully support ts, welcome to further improve

### example
[demo](https://github.com/Vitaminaq/cfsw-vue-cli3.0/tree/ssr-vue-cli-3.0)

