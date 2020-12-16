为了提升页面响应速度，优化用户体验，可以适当的减轻页面首次加载的压力，可以使用图片懒加载。  
In order to improve the page response speed and optimize the user experience, it can reduce the pressure of the first page loading appropriately. You can use the image lazy loading.
</br>
[![https://img.shields.io/npm/v/@wefly/vue-image-lazy-load.svg?label=@wefly/vue-image-lazy-load](https://img.shields.io/npm/v/@wefly/vue-image-lazy-load.svg?label=@wefly/vue-image-lazy-load)](https://www.npmjs.com/package/@wefly/vue-image-lazy-load)  ![总下载量](https://img.shields.io/npm/dt/@wefly/vue-image-lazy-load.svg)
    
### 安装/Install
```bash
npm install @wefly/vue-image-lazy-load --save
```
### 使用/Use
#### 全局注册/Global registration (main.js)
```javascript
import VueImgLazyLoad from '@wefly/vue-image-lazy-load';
// default
Vue.use(VueImgLazyLoader);
// options
Vue.use(VueImgLazyLoader, {
    observerOptions: {
	rootMargin: '0px 0px -400px 0px',
	threshold: 0.5
    },
    delayTime: 1000,
    lazyImg: 'image-url'
});
```
##### options
* oberserOptions: 观察者参数配置。  
rootMargin：可以区域范围，比如："0px 0px -100px 0px",则为元素超出视窗底部100px被视为可见；默认'0px'  
threshold(0-1)： 元素达到视窗设置的rootMargin，还要加上自身的百分比被视为可见；默认0  
* delayTime :给图片添加延时加载的时间,default: (Math.random() * 500)
* lazyImg : 图片资源同下（更新于 2019-12-06）
* oberserOptions: observer parameter configuration.  
rootMargin：areas such as "0px 0px-100px 0px" are considered visible if the element exceeds 100px at the bottom of the window; default is'0px'.   
threshold(0-1)：elements that reach the rootMargin of the window settings, plus their own percentages, are considered visible; default 0  
* delayTime : add a delay loading time to the picture,default: (500 + Math.random() * 500)
* lazyImg : image

#### 局部注册/Partial registration (*.vue)
```javascript
import { directive } from '@wefly/vue-image-lazy-load';
directives: {
    'img-lazy-load': directive
}
```
#### *.vue
##### 使用默认配置/use default config
```bash
<img :src="baseUrl" v-img-lazy-load />
```
#### 参数配置/Parameter configuration
* url:替换插件默认的展位图，格式请用base64格式，或者提起解析好的(require,import)，或者cdn地址，如果全局注册的时候有传入，这里可以不用传了。  
url: Replace the default booth map of the plug-in, in base64 format, or mention parsed(require,import) or CDN address.
If there is an incoming message during global registration, there is no need to send it here.
```html
<img :src="baseUrl" v-img-lazy-load="{url: ''}" />
```
