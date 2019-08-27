# SkillOfJavaScript
this repository is for Daily-Interview-Question
# webpack 中关于生产和开发环境的配置
在 webpack 中开发环境和生产环境是有非常大的不同点的,开发环境我们要求是要有强大的 source map 和一个有着 live reloading 实时重加载或者 hot module replacement 热模块替换能力的 localhost server.而在生产环境我们要求的是一个压缩过的bundle,更加轻量 source map 资源优化等,通过这些优化方式我们改善加载时间.通常这两种不同的环境下的 config.js 的逻辑不一样,所以是要分开写的,但是 CRA 是写到一起的,所以这个是根据自己的需求进行的,没有好或者坏的说法,都是可以的
一般我们是把通用的模块抽离出来,放到 common.js 中,然后再通过 webpack-merge 工具进行合并,把通用的代码进行抽离
```js

```