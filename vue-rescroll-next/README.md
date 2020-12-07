# vue-rescroll 是一款滚动状态管理指令化的插件。</br>Is a rolling state management instruction plug-in.

[![https://www.npmjs.com/package/@wefly/vue-rescroll](https://img.shields.io/npm/v/@wefly/vue-rescroll.svg?label=@wefly/vue-rescroll)](https://www.npmjs.com/package/@wefly/vue-rescroll)  ![总下载量](https://img.shields.io/npm/dt/@wefly/vue-rescroll.svg)

## How to use it

### install
```bash
npm install @wefly/vue-rescroll --save
```
### use
#### 全局注册/Global registration (main.js)
```javascript
import VueRescroll from '@wefly/vue-rescroll';
Vue.use(VueRescroll);
```
#### 局部注册/Partial registration (*.vue)
```javascript
import { directive } from '@wefly/vue-rescroll';
directives: {
    'rescroll': directive
}
```
#### *.vue
##### 使用默认配置/use default config
```javascript
<div v-rescroll="{name: 'A unique marker'}"></div>
```
#### 参数配置/Parameter configuration
| key  | require |  value |  type | discribe |  
| :--: | :-----: | :----: | :---: | -------- |  
| name | 是 |        | string | 用来保存滚动状态的key值 |
| type | 否 | 'default'/'window' | string | 滚动类型(局部，全局) |
| storageMode | 否 | 'default'/'localstorage' | string | 滚动状态保存方式 |
| domType | 否 | 'default'/'tab' | string | 是否为tab切换组件 |
```html
<div
    v-rescroll="{
        name: `${id}-scroll`,
        type: 'window',
        storageMode: 'localstorage'
    }"
     ></div>
```
### tips
页面不要使用keep-alive缓存，那样的话，钩子函数不会触发。</br>
Don't use keep-alive caching for your pages. In that case, the hook function won't trigger</br>
[详细描述各种现象博客地址](https://blog.csdn.net/theoneEmperor/article/details/82669022)

### example
[demo](https://github.com/Vitaminaq/cfsw-vue-cli3.0/tree/vue-3.0)

### vue 2.0+
please use [vue-rescroll](https://github.com/Vitaminaq/vue-rescroll)