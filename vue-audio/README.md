# vue-audios

### 一个依赖于vue框架的简易好用的audio音频库，支持同一页面多音频切换，并且同时只会存在一个音频播放，支持拖动，点击跳转至任意处播放。  
### A simple and easy to use Audio library that relies on the VUE framework. It supports multiple audio switches on the same page, and only one audio player exists at the same time. It supports dragging, clicking and jumping to play anywhere.

#### 安装/install
```bash
npm/cnpm install vue-audios --save / yarn add vue-audios
```

##### 参数配置/ params
| key  | require |  default |  type | discribe |  
| :--: | :-----: | :----: | :---: | -------- |  
| url | 是 |        | string | 音频地址 |
| duration | 否 | 0 | number | 音频时长 |
| autoplay | 否 | false | boolean | 是否自动播放 |

#### 使用/Use

##### 全局注册
``` javascript
// main.js or .ts
import 'vue-audios/dist/vue-audios.css';
import VueAudios from 'vue-audios';

Vue.use(VueAudios);

```

##### 局部使用
``` javascript
// main.js or .ts
import 'vue-audios/dist/vue-audios.css';
// 用到之处
import { VueAudios } from 'vue-audios';
```

[demo地址](https://www.vitaminaq.cn/example/vue-audios)

![audio](https://raw.githubusercontent.com/Vitaminaq/vue-pupop-toast/master/picture/vue-audios.gif)

#### tips
修改样式方式：fork自行修改，git复制源码，或者查看dom上的类名，进行覆盖。
新增功能，如：倍速播放等等，欢迎fork，自行修改，或者git提出issues等。

How to change styles: Fork modifies itself, Git copies the source code, or you can override it by looking at the class name on the DOM.
New features, such as: double speed playback, etc., welcome fork, self-modification, or Git raised issues, etc.
