var Px2vw = require('../lib');
var fs = require('fs');
var path = require('path');
var css = require('css');


test('测试px2vw转换', () => {
  var testCss = fs.readFileSync(path.join(__dirname, 'assets/test.css'), 'utf-8');
  var outputCss = fs.readFileSync(path.join(__dirname, 'output/px2vw.css'), 'utf-8');
  var px2vw = new Px2vw();

  expect(css.parse(px2vw.generateVw(testCss))).toEqual(css.parse(outputCss))
});
