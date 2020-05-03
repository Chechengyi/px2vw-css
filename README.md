# px2vw-css

px2vw是将 `px` 单位转换程 `vw` 单位的工具

## 如何使用
```bash
 npm install px2vw-css --save
```
```js
  var Px2vw = require('px2vw');
  var fs = require('fs');
  var px2vw = new Px2vw(options);
  var originCss = fs.readFileSync('xxx.css', 'utf-8')
  var outputCSs = px2vw.generateVw(originCss);
```
### options 参数解读
``` javascript
{
  unitWidth: 750   // 设计稿的宽度
  baseDpr: 2       // 默认的dpr
  vwPrecision: 3   // 转换成vw后保留的小数位
  forcePxComment: 'px'  //使用/*px*/ 标注
  keepComment: 'no'   // 使用 /*no*/ 标注该css属性不需要转换为vw
}
```

## 例子
如果使用的是 750 宽度的设计稿，则：
```css
  .banner {
    width: 375px;
    height: 150px;
    font-size: 23px; /*px*/
    background-color: red;
  }

  .warp {
    width: 375px;
    height: 150px; /*no*/
  }
```
转换后
```css
  .banner {
    width: 50vw;
    height: 20vw;
    background-color: red;
  }

  [data-dpr="1"] .banner {
    font-size: 11.5px;
  }

  [data-dpr="2"] .banner {
    font-size: 23px;
  }

  [data-dpr="3"] .banner {
    font-size: 34.5px;
  }

  .warp {
    width: 50vw;
    height: 150px;
  }
```

## 使用/*px*/
如果想要使得`/*px*/` 生效, 需要采取同 `flexible.js` 同样的方法，根据设备的 `dpr`和`viewport`设置的`initial-scale` 属性去给html设置一个 `data-dpr`属性。 使得不同的dpr设备能够读取到相应的计算出来的px数值。
可以直接在页面直接引入淘宝团队的 `flexible.js`，`flexible.js`是根据 `rem` 做屏幕适配的一个方案，其中的代码
不止有设置 `data-dpr` 还有监听窗口的 `resize` 事件去动态的计算 `rem`。使用了 `vw` 方案后不需要在动态的去监听
窗口大小的改变了，所以可以去除 `flexible.js` 中我们不需要的代码。

## 我觉的理想的样子
我觉得凡是一个方案都有一些约定，`flexible.js`中的代码是考虑了诸多种情况的，在实际的使用中我们完全可以规定设置：
```html
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
```

这样要使用 `/*px*/` 只需要写下以下js代码：

```javascript
var win = window;
var doc = win.document;
  var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var dpr = 0;
    var scale = 0;
     if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    } 
    docEl.setAttribute('data-dpr', dpr);
```



