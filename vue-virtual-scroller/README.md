# vue-virtual-scroller

### 一款基于vue3.0的虚拟滚动组件
### A virtual rolling component based on vue3.0。  
[![https://img.shields.io/npm/v/@wefly/vue-virtual-scroller.svg?label=@wefly/vue-virtual-scroller](https://img.shields.io/npm/v/@wefly/vue-virtual-scroller.svg?label=@wefly/vue-virtual-scroller)](https://www.npmjs.com/package/@wefly/vue-virtual-scroller)  ![总下载量](https://img.shields.io/npm/dt/@wefly/vue-virtual-scroller)

#### 安装/Install
``` bash
npm/cnpm install @wefly/vue-virtual-scroller --save / yarn add @wefly/vue-virtual-scroller
```

#### 使用/Use
``` javascript
// main.ts/js
import VueVirtualScroll from '@wefly/vue-virtual-scroller';
import '@wefly/vue-virtual-scroller/dist/vue-virtual-scroller.css';

Vue.use(VueVirtualScroll);

// 局部注册
// *.vue
import { VueVirtualScroller } from '@wefly/vue-virtual-scroller';
import '@wefly/vue-virtual-scroller/dist/vue-virtual-scroller.css';

// template
<vue-virtual-scroller
    :list="list"
    reScrollKey="blogHome"
>
    <template v-slot:header>
        <div>header</div>
    </template>
    <template v-slot:default="slotProps">
        <BlogHomeList :item="slotProps.item" />
    </template>
    <template v-slot:footer>
        <div>footer</div>
    </template>
</vue-virtual-scroller>

// script
components: {
    'vue-virtual-scroller': VueVirtualScroller
}
```

##### 参数/params
| key  | require |  default |  type | discribe |  
| :--: | :-----: | :----: | :---: | -------- |  
| list | 是 |    []    | Array | data |
| ownKey | 否 | index | string | key |
| buffer | 否 | 10 | number | 缓冲长度 |
| activeLen | 否 | 30 | number | 渲染总长度 |
| reScrollKey | 否 |  | string | 离开列表是否需要保存滚动位置 |
| direction | 否 | 'vertical' | string | 滚动方向 |
