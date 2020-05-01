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



