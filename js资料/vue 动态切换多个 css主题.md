vue 动态切换多个 css主题

因为需要切换网页的多个主题，而且在代码中，element-ui的CSS可以直接写在css中，但是标签的class中不需要引用。所以，不可以使用到vue的class的绑定判断

这里就用到了css的var()函数
var() 函数用于插入自定义的属性值，如果一个属性值在多处被使用，该方法就很有用。
例：color: var(custom-property-name, value)

管理CSS变量的最简单方法是将它们声明为：root伪类
通过--  + 字段名：值（这个值可以是任何我们在css输入的值）进行定义类似的js的定义，调用时候通过var()函数进行对应的调用，如下面代码一样var(--字段名)进行调用
:root {
  --main-bg-color: coral;
  --main-txt-color: blue;
  --main-padding: 15px;
}

 ```JS
#div1 {
  background-color: var(--main-bg-color);
  color: var(--main-txt-color);
  padding: var(--main-padding);
}
```

```JS
vuecli中使用
HTML
<div id="appid" class="w" :style="styleObject">

js
computed:{
        styleObject: function() {
            return {
            "--background-color": this.buttonColor,
            "--background-color-hover": this.buttonHover,
            };
        }
    },

CSS
#appid {
    background: var(--background-color)
}
#appid:hover {
    background: var(--background-color-hover);
}

```







vue element-ui downloads license