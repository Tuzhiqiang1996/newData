# javascript
### HTTP 返回的状态码有哪些
- 2开头状态码；2xx (成功)表示成功处理了请求的状态代码；如：200 (成功) 服务器已成功处理了请求。
- 3开头状态码；3xx (重定向) 表示要完成请求，需要进一步操作。 通常，这些状态代码用来重定向。如：304 (未修改) 自从上次请求后，请求的网页未修改过。 服务器返回此响应时，不会返回网页内容
- 4开头状态码；4xx(请求错误) 这些状态代码表示请求可能出错，妨碍了服务器的处理；如：400 (错误请求) 服务器不理解请求的语法；403 (禁止) 服务器拒绝请求。404 (未找到) 服务器找不到请求的网页。
- 5开头状态码；5xx(服务器错误)这些状态代码表示服务器在尝试处理请求时发生内部错误。 这些错误可能是服务器本身的错误，而不是请求出错；如：500 (服务器内部错误) 服务器遇到错误，无法完成请求

#
### babel各单元简介&如何写一个babel插件
> [链接](https://segmentfault.com/a/1190000013921832)

## `undefined` 和 `null` 之间有什么区别？

在了解`undefined`和`null`之间的区别之前，我们先得了解它们之间的相似之处。

它们都属于JavaScript的7种原始类型。

```js
let primitiveTypes = ['string','number','null','undefined','boolean','symbol', 'bigint'];
```

它们都是假值。当使用`Boolean(value)`或`!!value`将其转换为 boolean 时，所得的值为 false。

```js
console.log(!!null); //logs false
console.log(!!undefined); //logs false
 
console.log(Boolean(null)); //logs false
console.log(Boolean(undefined)); //logs false
```

现在让我们说说差异之处。

> `undefined`是尚未分配特定值的变量的默认值；或没有显式返回值的函数，例如`console.log(1)`；或对象中不存在的属性。JavaScript引擎为我们分配了`undefined`这个值以实现上述目的。

> null`意味着“变量值为空”。`null`是已明确定义给变量的值。在示例中，当fs.readFile方法未引发错误时，我们将得到的值为null。

