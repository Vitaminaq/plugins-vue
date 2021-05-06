# vue-pupop-toast

### 用typescript写的一个基于vue3.0的pupop和toast库,包括confirm,alert,loading,toast等，欢迎广大网友补充，支持ts语法提示。  
A pupop and toast Library of Vue3.0 written with typescript, including confirm, alert, loading, toast, etc. welcome to add, support TS syntax prompt.

#### 安装/install
```bash
npm/cnpm install @wefly/vue-popup --save / yarn add @wefly/vue-popup
```

#### 使用/Use
``` javascript
// main.js or index.js or .ts
import '@wefly/vue-popup/dist/style.css';
import VuePupop from '@wefly/vue-popup';

Vue.use(VuePupop)
```

#### .vue
##### confirm 参数配置/ params
| key  | require |  default |  type | discribe |  
| :--: | :-----: | :----: | :---: | -------- |  
| message | 是 |        | string | 提示信息 |
| bgOpacity | 否 | 0.4 | number | 背景蒙层的透明度 |
| buttons | 否 | [{ text: '确定' }, { text: '取消' }] | string | 底部按钮数组 |
| callback | 否 | close() | function | 如果使用默认配置，给'确定'按钮绑定回调事件 |
  
example:  
``` javascript
async click() {
  const r = await this.$pupop.confirm({
    message: '确定删除此信息',
    buttons: [
      {
        text: '取消',
        callback: () => {
          return this.getAjaxMethod();
        }
      },
      {
        text: '删除',  // 按钮文案
        color: 'red', // 按钮颜色
        callback: () => {  // 点击按钮回调
          return this.getAjaxMethod();
        }
      }
    ]
  });
}
```
![confirm](https://raw.githubusercontent.com/Vitaminaq/vue-pupop-toast/master/picture/confirm.png)
##### alert 参数配置/ params
| key  | require |  default |  type | discribe |  
| :--: | :-----: | :----: | :---: | -------- |  
| message | 是 |        | string | 提示信息 |
| bgOpacity | 否 | 0.4 | number | 背景蒙层的透明度 |
| btnText | 否 | '确定' | string | 按钮文案 |
| btnColor | 否 | orange | string | 按钮文本颜色 |
| callback | 否 | close() | function | 按钮绑定回调事件 |
  
example:  
``` javascript
async click() {
  const r = await this.$pupop.alert({
    message: '点赞成功',
    btnText: '知道了',
    callback: () => {
      return this.getAjaxMethod();
    }
  });
}
```
![alert](https://raw.githubusercontent.com/Vitaminaq/vue-pupop-toast/master/picture/alert.png)
##### loading 参数配置/ params
| key  | require |  default |  type | discribe |  
| :--: | :-----: | :----: | :---: | -------- |  
| message | 是 |        | string | 提示信息 |
| bgOpacity | 否 | 0.4 | number | 背景蒙层的透明度 |
| icon | 否 | 默认为菊花图 | string | loading动图地址或者base64等等 |
| duration | 否 | 500 | number | loading持续时间，当有callback时，无效，默认为回调结束时关闭弹窗 |
| callback | 否 | close() | function | loading回调事件 |
  
example:  
``` javascript
async click() {
  const r = await this.$pupop.loading({
    message: '加载中...',
    duration: 2000,
    callback: () => {
      return this.getAjaxMethod();
    }
  });
}
```
![loading](https://raw.githubusercontent.com/Vitaminaq/vue-pupop-toast/master/picture/loading.png)
##### toast 参数配置/ params
带icon的toast  

| key | require |  default |  type | discribe |  
| :--: | :-----: | :----: | :---: | -------- |  
| message | 是 |        | string | 提示信息 |
| icon | 否 | 默认为'success'/'warn'/'error' | string | 可手动修改图片地址或者base64等等 |
| duration | 否 | 500 | number | toast持续时间 |
  
example:  
``` javascript
async click() {
  this.$pupop.toast({
    message: '请求成功',
    icon: 'success',
    duration: 1000
  });
}
```
![toast1](https://raw.githubusercontent.com/Vitaminaq/vue-pupop-toast/master/picture/toast1.png)
简易式的的一段小字体toast  
example:  
``` javascript
async click() {
  this.$pupop.toast('加载成功', 1000);
}
```
![toast2](https://raw.githubusercontent.com/Vitaminaq/vue-pupop-toast/master/picture/toast2.png)

#### tips
除了toast其余方法都是promise结构，可以拿回callback执行完成后的回调结果，前提是得有return。旨在提供一些js调用的思路，可能有些界面设计的很粗糙，甚至有点不堪入目，你可以fork过去自行修改，哈哈哈。
