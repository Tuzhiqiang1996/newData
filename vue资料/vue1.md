# vue

### 1、什么是 MVVM 框架？它适用于哪些场景？

> MVVM 框架是一个 Model-View-View Model 框架，其中 ViewModel 连接模型 Model）和视图（View）。
> 在数据操作比较多的场景中，MVVM 框架更合适，有助于通过操作数据渲染页面。

### 2、active- class 是哪个组件的属性？

> 它是 vue-router 模块的 router-link 组件的属性。

### 3、如何定义 Vue- router 的动态路由？

> 在静态路由名称前面添加冒号，例如，设置 id 动态路由参数，为路由对象的 path 属性设置/:id。

### 4、如何获取传过来的动态参数？

> 在组件中，使用$router 对象的 params.id，即 $route.params.id 。

### 5、vue- router 有哪几种导航钩子？

> 有 3 种。

> 第一种是全局导航钩子：router.beforeEach(to,from,next)。作用是跳转前进行判断拦截。

> 第二种是组件内的钩子。

> 第三种是单独路由独享组件。

### 6、mint-ui 是什么？如何使用？

> 它是基于 Vue.js 的前端组件库。用 npm 安装，然后通过 import 导入样式和 JavaScript 代码。vue.use(mintUi)用于实现全局引入， import {Toast} from ' mint-ui'用于在单个组件局部引入。

### 7、V-model 是什么？有什么作用？

> v- model 是 Vue. js 中的一条指令，可以实现数据的双向绑定。

### 8、Vue.js 中标签如何绑定事件？

> 绑定事件有两种方式。

> 第一种，通过 v-on 指令， <input v-on:click= doLog()/>。

> 第二种，通过@语法糖，< input@ click= doLog()/>。

### 9、vuex 是什么？如何使用？在哪种功能场景中使用它？

> vuex 是针对 Vue. js 框架实现的状态管理系统。

> 为了使用 vuex，要引入 store，并注入 Vue.js 组件中，在组件内部即可通过$ ostore 访问 store 对象。

> 使用场景包括：在单页应用中，用于组件之间的通信，例如音乐播放、登录状态管理、加入购物车等。

### 10、如何实现自定义指令？它有哪些钩子函数？还有哪些钩子函数参数？

> 自定义指令包括以下两种。

> 全局自定义指令：vue.js 对象提供了 directive 方法，可以用来自定义指令。directive 方法接受两个参数，一个是指令名称，另一个是函数。

> 局部自定义指令：通过组件的 directives 属性定义。

> 它有如下钩子函数。

> bind：在指令第一次绑定到元素时调用。

> inserted：在被绑定元素插入父节点时调用（Vue2.0 新增的）。

> update：在所在组件的 VNode 更新时调用。

> componentUpdated：在指令所在组件的 VNode 及其子 VNode 全部更新后调用（Vue2.0 新增的）。

> unbind：只调用一次，在指令与元素解除绑定时调用。

> 钩子函数的参数如下。

> el：指令所绑定的元素。

> binding：指令对象。

> vnode：虚拟节点。

> oldVnode：上一个虚拟节点。

### 11、至少说出 vue.js 中的 4 种指令和它们的用法。

> 相关指令及其用法如下。
> v-if：判断对象是否隐藏。
> v-for：循环渲染。
> v-bind：绑定一个属性。
> v- model：实现数据双向绑定。

### 12、Vue-router 是什么？它有哪些组件？

> 它是 Vue. js 的路由插件。组件包括 router-link 和 router-vIew。

### 13、导航钩子有哪些？它们有哪些参数？

> 导航钩子又称导航守卫，又分为全局钩子、单个路由独享钧子和组件级钧子。

> 全局钩子有 beforeEach、beforeResolve(Vue2.5.0 新增的)、 afterEach。

> 单个路由独享钩子有 beforeEnter。

> 组件级钩子有 beforeRouteEnter、 beforeRouteUpdate(Vue2.2 新增的) beforeRouteLeave。

> 它们有以下参数。

> to：即将要进入的目标路由对象。

> from：当前导航正要离开的路由。

> next：一定要用这个函数才能到达下一个路由，如果不用就会遭到拦截。

### 14、Vue.js 的双向数据绑定原理是什么？

> Vue. js 采用 ES5 提供的属性特性功能，结合发布者-订阅者模式，通过 Object.defineProperty()为各个属性定义 get、set 特性方法，在数据发生改变时给订阅者发布消息，触发相应的监听回调。
> 具体步骤如下。

> （1）对需要观察的数据对象进行递归遍历，包括子属性对象的属性，设置 set 和 get 特性方法。当给这个对象的某个值赋值时，会触发绑定的 set 特性方法，于是就能监听到数据变化。

> （2）用 compile 解析模板指令，将模板中的变量替换成数据。然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者。一旦数据有变动，就会收到通知，并更新视图

> （3） Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要功能如下。

> 在自身实例化时向属性订阅器（dep）里面添加自己。

> 自身必须有一个 update( )方法。

> 在 dep.notice()发布通知时，能调用自身的 updat()方法，并触发 Compile 中绑定的回调函数。

> （4）MVVM 是数据绑定的入口，整合了 Observer、 Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化通知视图更新的效果。利用视图交互，变化更新数据 model 变更的双向绑定效果。

### 15、请详细说明你对 Vue.js 生命周期的理解。

> 总共分为 8 个阶段，分别为 beforeCreate、created、beforeMount、 mounted、beforeUpdate、 updated、 beforeDestroyed、 destroyed。

> beforeCreate：在实例初始化之后，数据观测者（ data observer）和 event/ watcher 事件配置之前调用。

> created：在实例创建完成后立即调用。在这一步，实例已完成以下的配置：数据观测者，属性和方法的运算，

> watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。

> beforeMount：在挂载开始之前调用，相关的 render 函数首次调用。

> mounted: el 被新创建的 vm.$el 替换，并且在挂载到实例上之后再调用该钩子如果 root 实例挂载了一个文档内元素，当调用 mounted 时 vm.sel 也在文档内。

> beforeUpdate：在数据更新时调用，发生在虛拟 DOM 重新渲染和打补丁之前。

> updated：由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩。

> beforeDestroy：在实例销毁之前调用。在这一步，实例仍然完全可用。

> destroyed：在 Vue. js 实例销毀后调用。调用后，Vue. js 实例指示的所有东西都会解除绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

> 当使用组件的 kep- alive 功能时，增加以下两个周期。

> activated 在 keep- alive 组件激活时调用；

> deactivated 在 keep-live 组件停用时调用。

> Vue2.5.0 版本新增了一个周期钩子：ErrorCaptured，当捕获一个来自子孙组件的错误时调用。

### 16、请描述封装 Vue 组件的作用过程。

> 组件可以提升整个项目的开发效率，能够把页面抽象成多个相对独立的模块，解决了传统项目开发中效率低、难维护、复用性等问题。

> 使用 Vue.extend 方法创建一个组件，使用 Vue.component 方法注册组件。子组件需要数据，可以在 props 中接收数据。而子组件修改妤数据后，若想把数据传递给父组件，可以采用 emit 方法。

### 17、你是怎样认识 vuex 的？

> vuex 可以理解为一种开发模式或框架。它是对 Vue. js 框架数据层面的扩展。通过状态（数据源）集中管理驱动组件的变化。应用的状态集中放在 store 中。改变状态的方式是提交 mutations，这是个同步的事务。异步逻辑应该封装在 action 中。

### 18、Vue- loader 是什么？它的用途有哪些？

?它是解析.vue 文件的一个加载器，可以将 template/js/style 转换成 JavaScript 模块。
用途是通过 vue-loader, JavaScript 可以写 EMAScript 6 语法， style 样式可以应用 scss 或 less, template 可以添加 jade 语法等。

### 19、请说出 vue.cli 项目的 src 目录中每个文件夹和文件的用法。

> assets 文件夹存放静态资源；components 存放组件；router 定义路由相关的配置；view 是视图；app. vue 是一个应用主组件；main.js 是入口文件。

### 20、在 Vue.cli 中怎样使用自定义组件？在使用过程中你遇到过哪些问题？

> 具体步骤如下。

> （1）在 components 目录中新建组件文件，脚本一定要导出暴露的接口。

> （2）导入需要用到的页面（组件）。

> （3）将导入的组件注入 uejs 的子组件的 components 属性中。

> （4）在 template 的视图中使用自定义组件。

### 21、谈谈你对 vue.js 的 template 编译的理解。

> 简而言之，就是首先转化成 AST（ Abstract Syntax Tree，抽象语法树），即将源代码语法结构抽象成树状表现形式，然后通过 render 函数进行渲染，并返回 VNode（ Vue. js 的虚拟 DOM 节点）。

详细步骤如下。

> （1）通过 compile 编译器把 template 编译成 AST, compile 是 create Compiler 的返回值， createCompiler 用来创建编译器。另外， compile 还负责合并 option。

> （2）AST 会经过 generate（将 AST 转化成 render funtion 字符串的过程）得到 render 函数， render 的返回值是 VNode, VNode 是 Vue.Js 的虚拟 DOM 节点，里面有标签名子节点、文本等。

### 22、说一下 Vue.js 中的 MVVM 模式。

> MVVM 模式即 Model- View- ViewModel 模式。

> Vue.js 是通过数据驱动的， Vue. js 实例化对象将 DOM 和数据进行绑定，一旦绑定，和数据将保持同步，每当数据发生变化，DOM 也会随着变化。

> ViewModel 是 Vue.js 的核心，它是 Vue.js 的一个实例。Vue.js 会针对某个 HTML 元素进行实例化，这个 HTML 元素可以是 body，也可以是某个 CSS 选择器所指代的元素。

> DOM Listeners 和 Data Bindings 是实现双向绑定的关键。DOM Listeners 监听页面所有 View 层中的 DOM 元素，当发生变化时，Model 层的数据随之变化。Data Bindings 会监听 Model 层的数据，当数据发生变化时，View 层的 DOM 元素也随之变化。

### 23、v-show 指令和 v-if 指令的区别是什么？

> v-show 与 v-if 都是条件渲染指令。不同的是，无论 v-show 的值为 true 或 false，元素都会存在于 HTML 页面中；而只有当 v-if 的值为 true 时，元素才会存在于 HTML 页面中。v-show 指令是通过修改元素的 style 属性值实现的。

### 24、如何让 CSS 只在当前组件中起作用？

> 在每一个 Vue.js 组件中都可以定义各自的 CSS、 JavaScript 代码。如果希望组件内写的 CSS 只对当前组件起作用，只需要在 Style 标签添加 Scoped 属性，即<style scoped></style>。

### 25、如何创建 vue.js 组件？

在 vue.js 中，组件要先注册，然后才能使用。具体代码如下

```html
<！--应用程序-->
<div id="app">
  <ickt></ickt>
</div>
<！--模板-->
<template id="demo">
  <！--模板元素要有同一个根元素-->
  <div>
    <h1>{{msg}}</h1>
  </div>
</template>
<script type="text/javascript">
  //定义组件类
  var Ickt = Vue.extend ({
  template：'#demo',
  data:function(){
  return {
  msg：'有课前端网'
  }
  }
  })
  //注册组件
  Vue .component（'ickt, Ickt）
  //定义Vue实例化对象
  var app= new Vue ({
  el：'#app',
  data:{}
  })
</script>
```

### 26、如何实现路由嵌套？如何进行页面跳转？

路由嵌套会将其他组件渲染到该组件内，而不是使整个页面跳转到 router-view 定义组件渲染的位置。要进行页面跳转，就要将页面渲染到根组件内，可做如下配置。

```html
new Vue({ el：'#icketang', router:router, template：'<router-view
></router-view>' })
```

首先，实例化根组件，在根组件中定义组件渲染容器。然后，挂载路由，当切换路由时，将会切换整个页面。

### 27、ref 属性有什么作用？

> 有时候，为了在组件内部可以直接访问组件内部的一些元素，可以定义该属性此时可以在组件内部通过 this. $refs 属性，更快捷地访问设置 ref 属性的元素。这是一个原生的 DOM 元素，要使用原生 DOM API 操作它们，例如以下代码。

```html
<div id="icke">
< span ref="msg">有课前端网</span>
< span ref=" otherMsg">专业前端技术学习网校</span>
</div>
app. $refs. msg. text Content
//有课前端网
app. $refs.otherMsg. textContent
//专业前端技术学习网校
注意：在Ve2.0中，ref属性替代了1.0版本中v-el指令的功能。
```

### 28、Vue. js 是什么？

Vue. js 是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue.js 采用自下而上增量开发的设计。Vue.js 的核心库只关注视图层，并且容易学习，易于与其他库或已有项目整合。另外， Vue. js 完全有能力驱动采用单文件组件以及 Vue.js 生态系统支持的库开发的复杂单页应用。

Vue. js 的目标是通过尽可能简单的 API 实现响应式的数据绑定的组件开发。

### 29、描述 vue.js 的一些特性。

> Vue.js 有以下持性。

（1）MVVM 模式。

数据模型（ Model）发生改变，视图（View）监听到变化，也同步改变；视图（View）发生改变，数据模型（ Model）监听到改变，也同步改变。

使用 MVVM 模式有几大好处。

低耦合度，视图可以独立于模型变化和修改，一个 View Model 可以绑定到不同的视图上，当视图变化时模型可以不变，当模型变化时视图也可以不变.

可重用性，可以把一些视图的逻辑放在 ViewModel 里面，让很多视图复用这段视图逻辑。

独立开发，开发人员可以专注于业务逻辑和数据的开发。设计人员可以专注于视图的设计。

可测试性，可以针对 View Model 来对视图进行测试。

（2）组件化开发

（3）指令系统

（4）Vue2.0 开始支持虚拟 DOM。

但在 Vue1.0 中，操作的是真实 DOM 元素而不是虚拟 DOM，虚拟 DOM 可以提升页面的渲染性能。

### 30、描述 vue.js 的特点。

Vue. js 有以下特点。

简洁：页面由 HTML 模板+JSON 数据+ Vue. js 实例化对象组成。

数据驱动：自动计算属性和追踪依赖的模板表达式。

组件化：用可复用、解耦的组件来构造页面。

轻量：代码量小，不依赖其他库。

快速：精确而有效地批量实现 DOM 更新。

易获取：可通过 npm、 bower 等多种方式安装，很容易融入。

### 31、在 vue.js 中如何绑定事件？

> 通过在 v-on 后跟事件名称=“事件回调函数( )”的语法绑定事件。事件回调函数的参数集合( )可有可无。如果存在参数集合( )，事件回调函数的参数需要主动传递，使用事件对象要传递 $event。当然，此时也可以传递一些其他自定义数据。如果没有参数集合，此时事件回调函数有一个默认参数，就是事件对象。事件回调函数要定义在组件的 methods 属性中，作用域是 Vue. js 实例化对象，因此在方法中，可以通过 this 使用 Vue. js 中的数据以及方法，也可以通过@语法糖快速绑定事件，如@事件名称=“事件回调函数( )”。

### 32、请说明<keep-alive>组件的作用。

当<keep- alive>包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

<keep-alive>是一个抽象组件，它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。

当在<keep-alive>内切换组件时，它的 activated 和 deactivated 这两个生命周期钧子函数将会执行。

```js
<keep-alive>
<component :is="view"></component>
</keep-alive >
```

### 33、axios 是什么？如何使用它？

axios 是在 vue2.0 中用来替换 vue-resource.js 插件的一个模块，是一个请求后台的模。

> 用 npm install axios 安装 axios。基于 EMAScript 6 的 EMAScript Module 规范，通过 import 关键字将 axios 导入，并添加到 Vue. js 类的原型中。这样每个组件（包括 vue.js 实例化对象）都将继承该方法对象。它定义了 get、post 等方法，可以发送 get 或者 post 请求。在 then 方法中注册成功后的回调函数，通过箭头函数的作用域特征，可以直接访问组件实例化对象，存储返回的数据。

```js
import Vue from ' vue' import axios from 'axios'； Vue.prototype.$http=axios；
new Vue ({ el：' ickt', data：{ msg：' ' }， template：'
<h1>{ { msg } }</h1>
'， created:function() { this.$http.get( 'data.json' ) .then（res => { this.
msg= res .data. data }) } })
```

### 34、在 axios 中，当调用 axios.post('api/user'）时进行的是什么操作？

> 当调用 post 方法表示在发送 post 异步请求。

### 35、sass 是什么？如何在 ue 中安装和使用？

> sass 是一种 CSS 预编译语言安装和使用步骤如下。

（1）用 npm 安装加载程序（ sass-loader、 css-loader 等加载程序)。

（2）在 webpack. config. js 中配置 sass 加载程序。

```js
模块
module：{
//加载程序
loaders:[
//加载scss
{
test:/ \ .scss$ /,
loader : 'vue-style-loader！css-loader！sass-loader '
        }
      ]
}
```

（3）在组件的 style 标签中加上 lang 属性，例如 lang="scss"。

```html
<style type="text/css" lang="scss">
  $color:red； h1 {
    color: $color;
  }
</style>
```

### 36、如何在 Vue. js 中循环插入图片？

对“src”属性插值将导致 404 请求错误。应使用 v-bind:src 格式代替。

代码如下：

```html
<ul class="list">
<li v-for="item in list">
<img ：src=" 'img/' + item.url" alt=">
</1i>
</u1>
```

注意：vue1.0 中支持属性插值，在 2.0 版本中，只允许通过 v-bind 指令或者冒号语法糖“ : ”实现属性动态绑定。

### 37、如何为选框元素自定义绑定的数据值？

对于单选框， value 通常是静态字符串，如果 v- model 绑定的数据与某个 value 值相等，则那个单选框被选中。

```html
<1abe1>选择你喜欢的运动</1abe1>
<！--数据双向绑定-->
<label>篮球<input  type="radio"  v-model="sports"  value="basketball"></label>
<label>足球<input  type="radio"  v-model="sports"  value="football"></label>
<label>网球<input  type="radio"  v-model="sports"  value="netball"></label>
```

> 对于多选框，v- model 绑定变量的值，通常是布尔值，true 表示选中， false 表示未选中。如果要自定义绑定数据的值，需要用 v-bind 指令设置 true- value（选中时的值）以及 false- value（未选中时的值）。

```html
<1abe1>选择你的兴趣爱好</labe1>
<label>足球<input type="checkbox"  v-model="intrest. football"></label>
<label>篮球<input type="checkbox"  v-model="intrest. basketball"  v-bind:true-value=
" trueValue" v-bind:false-value="falsevalue"></label>
```

### 38、什么情况下会产生片段实例？

> 在以下情况下会产生片段实例模板包含多个顶级元素；模板只包含普通文本；模板只包含其他组件（其他组件可能是一个片段实例）；模板只包含一个元素指令，如 vue- router 的< router-view>；模板根节点有一个流程控制指令，如 v-if 或 v-for。

> 这些情况让实例有未知数量的顶级元素，模板将把它的 DOM 内容当作片段。片段实例仍然会正确地渲染内容。不过，模板没有一个根节点，它的$el 指向一个锚节点，即一个空的文本节点（在开发模式下是一个注释节点）。

> 注意：在 Vue2.0 中，组件的模板只允许有且只有一个根节点。

### 39、实现多个根据不同条件显示不同文字的方法。

> 通过“v-if,v-else”指令可以实现条件选择。但是，如果是多个连续的条件选择，则需要用到计算属性 computed。例如在输入框中未输入内容时，显示字符串‘请输入内容’，否则显示输入框中的内容，代码如下。

```js
<div id="app">
<input type="text  v-model="inputvalue">
<hl>  {  { showValue } }</h1>
</div>
var app = new Vue ( {
 e1："#app'，
data：{
inputvalue：'  '
computed: {
 showValue:function ( ) {
return this. inputvalue | | '请输入内容'
       }
}
})
```

### 40、什么是数据的丢失？

如果在初始化时没有定义数据，之后更新的数据是无法触发页面渲染更新的，这部分数据是丢失的数据（因为没有设置特性），这种现象称为数据的丢失。

### 41、如何检测数据变化？

> 由于 JavaScript 特性的限制， Vue. js 不能检测到下面数组的变化，即以下数组中改变的数据“丢失”了。

> 通过直接索引设置元素，如 app.arr[0]=...

> 修改数据的长度，如 app. arr.length。

> 为了解决该问题，Vue.js 扩展了观察数组，为它添加了一个$set( )方法，用该方法修改的数组，能触发视图更新，检测数据变化。

> app.$set(app. arr, 5， 500);

### 42、如何检测对象变化？

由于 JavaScript 特性的限制，Vue.js 不能检测到对象属性的添加或删除。因为 Vue.js 在初始化时将属性转化为 getter/setter，所以属性必须在 data 对象中定义，才能在初始化时让 Vue.js 转换它并让它响应，例如以下代码

```js
var data ={
 obj:{
 a:1
}
}
var app= new Vue ({
el：'#app ',
data:data
})
app.obj.a=10
// 'app.obj.a'和'data.obj.a'现在是响应的
app. obj. b=2
//'app.obj.b'不是响应的
data.obj.b=2
//data.obj.b'不是响应的
如果需要在实例创建之后添加属性并且让它能够响应，可以使用$set实例方法。

app.$set（app.obj，'b'，500）
// 'app.obj.b'和'data.obj.b'现在是响应的
对于普通数据对象，可以使用全局方法Vue.set（ object,key, value）。

Vue.set（data.obj，"b'，500）
//'app.obj.b'和'cata,obj.b'现在是响应的
```

### 43、说一下 Vue.js 页面闪烁{{message}}。

> Vue. js 提供了一个 v- cloak 指令，该指令一直保持在元素上，直到关联实例结束编译。当和 CSS 一起使用时，这个指令可以隐藏未编译的标签，直到实例编译结束。用法如下。

```html
[v-cloak ]{ display:none; }

<div v-cloak>{ { title } }</div>
这样
<div>不会显示，直到编译结束。</div>
```

### 44、如何在 v-for 循环中实现 v-model 数据的双向绑定？

> 有时候需要循环创建 input，并用 v- model 实现数据的双向绑定。此时可以为 v- model 绑定数组的一个成员 selected [$ index]，这样就可以给不同的 input 绑定不同的 v- model，从而分别操作它们。

```html
<div v-for=" ( item, index ) in arr">
  <input type="text " v-model="arr [index ] " />
  <h1>{ { arr [index ] } }</h1>
</div>
```

### 45、如何解决数据层级结构太深的问题？

在开发业务时，经常会岀现异步获取数据的情况，有时数据层次比较深，如以下代码。

```html
<span 'v-text="a.b.c.d"></span>
可以使用 vm.$set 手动定义一层数据。

vm.$set ("demo"，a .b.c.d)
```

### 46、Vue.js 文件中的样式覆盖不生效的问题如何解决？

> 按照 Vue. js 官方给出的说法， style 加上 scoped 可以让样式“私有化”（即只针对当前 Vue.js 文件（组件）中的代码有效，不会对别的文件（组件）中的代码造成影响）
> 很多时候，我们引入了第三方 UI，在 Vue. js 文件中进行样式覆盖不生效，多半问题是 style 上的 scoped 导致的。
> 解决方案是将需要覆盖样弌的这部分代码放到单独的 CSS 文件中，最后在 main.js 文件中导入即可。

### 47、在 Vue. js 开发环境下调用接口，如何避免跨域？

在工程目录 config/ index.js 内对 proxyTable 项进行如下配置。

```js
proxyTable:{
'/api '：{
target:http://xxxxxx.com
changeOrigin:true,
pathRewrite:{
'^/api'：' '
}
}
}
```

### 48、什么是虚拟 DOM

> 虚拟 DOM 就是用 JS 来模拟 DOM 结构。

~`~[简书虚拟 dom](https://www.jianshu.com/p/9cdf60779c9a)

### 49、虚拟 DOM 与真实 DOM 的区别？

1、虚拟 DOM 不会进行重排与重绘操作；

2、虚拟 DOM 进行频繁修改，然后一次性比较并修改真实 DOM 中需要修改的部分，最后进行重排和重绘，减少过多 DOM 节点重排和重绘损耗。

3、虚拟 DOM 有效降低大面积（真实 DOM 节点）的重排和重绘，因为最终与真实 DOM 比较差异，可以局部渲染。
