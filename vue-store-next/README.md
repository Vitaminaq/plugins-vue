### 一款适合vue 3.0的状态管理插件，是对之前vue-lazy-store的升级，支持typescript。
### Vue 3.0 state management plug-in,Simple version of vuex，support typescript。  
[![https://img.shields.io/npm/v/@wefly/vue-store-next.svg?label=@wefly/vue-store-next](https://img.shields.io/npm/v/@wefly/vue-store-next.svg?label=@wefly/vue-store-next)](https://www.npmjs.com/package/@wefly/vue-store-next)  ![总下载量](https://img.shields.io/npm/dt/@wefly/vue-store-next)

#### 安装/Install
``` bash
npm/cnpm install @wefly/vue-store-next --save / yarn add @wefly/vue-store-next
```

#### 使用/Use
使用方法跟vuex类似，基本可以无缝切换.  
Similar to vuex, it can be switched seamlessly.

##### store.ts / js
```javascript
// ts写法
import Store, { StoreOberser } from "@wefly/vue-store-next";

// 继承StoreOberser 则开启数据监听,监听所有$(= vuex.mutation)开头的方法
class Test extends StoreOberser {
    public count: number = 0,
    public $add() {
	    this.count++;
    }
}
export class BaseStore extends Store {
    public test = new Test();
    public constructor() {
	super();
	    return this.init(true); // 传入true，dev环境开启数据监听log打印，默认false
    }
}

// 客户端渲染-单例模式
export default new BaseStore();
// 服务的渲染-多例模式
export default BaseStore;

// 把store的类型挂载到vue.$store上
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
	    $store: BaseStore;
    }
}

// js写法
const text1 = {
    count: 0,
    $add() {
	    this.count++;
    }
}
const store = new Store({
    text1
});
export default store.init();
```
##### main.ts/js
```javascript
import store from './store';

const sub = (op) => {
    console.log('我是正在执行的$方法：', op);
}
// 订阅store-可捕捉所有$方法的执行轨迹
store.subscribe(sub);
// 取消订阅
store.removeSub(sub);
// 销毁所有订阅
store.destroySub

createApp(App)
    .use(store)
    .mount('#app');
```

##### .vue-ts/js
``` javascript
import { defineComponent } from 'vue';

export default defineComponent({
    computed: {
        text1() {
            return this.$store.text1;
        },
        count() {
            return this.text1.count; // 0
        }
    },
    mounted() {
        this.text1.$add();
        console.log(this.count); // 1;
    }
})
```

##### 动态注册store module
``` javascript
const text1 = {
    count: 0,
    add() {
	    this.count++;
    }
}
setup() {
    if (!store['text1']) {
	    store.addMoudle('text1', text1);
    }
}
// 具体请参照demo里，router/base-route-view.ts
```

### example
[demo](https://github.com/Vitaminaq/cfsw-vue-cli3.0/tree/vue-3.0)

### vue 2.0+
请使用[仓库地址](https://github.com/Vitaminaq/vue-lazy-store)

