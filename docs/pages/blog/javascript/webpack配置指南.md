# webpack配置指南
<br />

::: tip
本文根据《Webpack实战：入门、进阶与调优》整理。限于篇幅，部分内容可能难以理解，建议直接阅读书籍并对比示例。
:::

## webpack简介

> 要用webpack首先得知道为什么要用它，webpack的最大优势就是可以实现模块化。然而，JS为什么要模块化呢？这是因为传统的JS开发：污染全局作用域、需要手动维护JS的加载顺序、每个script标签都意味着需要向服务器发起一次静态请求。而模块化可以很好解决上述问题：模块之间的作用域是相互隔离的、通过导入和导出语句可以很清晰的看到模块间的依赖关系、模块可以借助工具打包从而实现资源合并。


前端在很早以前就出现了模块化的思想。到2015年，ES6正式定义了JS的模块标准。但是大多数的npm模块还是CommonJS的形式，浏览器并不支持。模块打包工具的任务就是解决模块间的依赖，使其打包后的结果能运行在浏览器上。

这里要说到webpack相对于其他打包工具的优势，如Parcel、Rollup等。

- Webpack默认支持多种模块标准，包括AMD、CommonJS以及ES6模块。
- Webpack有完备的代码分割解决方案。
- Webpack可以处理各种类型的资源。除了JS以外，还能处理样式、模板，图片等。
- Webpack有强大的社区支持。

**进入正题：**

我的代码同步在[github](https://github.com/aaaxiu/Webpack_Config)上，可对比查看。

**安装：**

Webpack可运行在绝大部分的操作系统，它的唯一依赖是Node。有一点需要注意的是，Node推荐全局安装，Webpack推荐本地安装，即安装在项目内。这样可保证项目在多人协作时能保证Webpack版本一致。而且，部分依赖于Webpack的插件会调用项目中的Webpack的内部模块，这种情况下仍然需要在项目本地安装Webpack。

首先新建一个工程目录，使用`yarn init`进行项目初始化。接下来执行安装Webpack的命令：

``` 
yarn add webpack webpack-cli --dev
```

这里的webpack是核心模块，webpack-cli是命令行工具。安装完成后执行`npx webpack -v`和`npx webpack-cli -v`查看各自版本。注意，在本地安装的webpack无法直接使用webpack命令，需要加上npx。

**打包第一个应用：**

首先在工程目录下添加一下几个文件。

index.js
```js
import addContent from './add-content.js'

document.write('My first Webpack app.<br />')

addContent()
```

add-content.js
```js
export default function() {
  document.write('Hello World!')
}
```

index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My first Webpack app.</title>
</head>
<body>
  <script src="./dist/bundle.js"></script>
</body>
</html>
```

然后在控制台运行：
```
npx webpack --entry=./index.js --output-filename=bundle.js --mode=development
```

用浏览器打开index.html即可看到打包后的结果。

**使用npm scripts**

使用npm scripts可以使命令行指令更加简洁，不必每次输入一长串的指令。具体在package.json里面添加：
```json
{
  "scripts": {
    "build": "webpack --entry=./index.js --output-filename=bundle.js --mode=development"
  }
}
```

注意，这里可以直接使用模块所添加的指令了，用`webpack`取代了`npx webpack`。随意修改文件后，这次执行`yarn build`同样可以打包成功。

**使用配置文件：**

Webpack的默认配置文件是webpack.config.js，添加配置文件并加入如下代码：
```js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  mode: 'development'
}
```

修改package.json的脚本为`"build":"webpack"`，再次对内容进行修改并打包，可以发现配置文件生效了。

**webpack-dev-server**

每次修改完文件后都要重新进行打包并手动刷新网页当然是不能接受的。幸好webpack社区为我们提供了一个便捷的本地开发工具webpack-dev-server。首先进行安装：
```
yarn add webpack-dev-server --dev
```

为了方便使用，同样在npm的脚本文件中添加指令：
```json
"scripts": {
  "build": "webpack",
  "dev": "webpack-dev-server"
}
```

最后，在webpack.config.js中配置webpack-dev-server：
```js
module.exports = {
  // ...
  devServer: {
    publicPath: '/dist'
  }
}
```

配置完成后，打开`localhost:8080`查看使用webpack-dev-server的结果。这里有一点需要注意，直接使用webpack开发和使用webpack-dev-server有一个很大的区别，前者每次都会生成bundle.js，而webpack-dev-server只是将打包结果放在内存中，并不会写入实际的bundle.js，在每次webpack-dev-server接收到请求时都只是将内存中的打包结果返回给浏览器。webpack-dev-server还有一项很便捷的特性就是live-reloading（自动刷新），它在修改源文件时会自动刷新页面同步更新。

## 模块打包标准

**CommonJS**

CommonJS在09年提出，而后Node实现了CommonJS标准的一部分，现在说CommonJS一般指的是Node中的标准。CommonJS最初只为服务端而设计，直到有了Browserify——一个运行在Node.js环境下的模块打包工具，它可以将CommonJS模块打包为浏览器可以运行的单个文件。从此，客户端也可以使用CommonJS标准。

前面已经说过，模块化的一大好处是模块之间的作用域互不影响，不会污染全局作用域。

CommonJS通过module.exports导出模块内容，模块内部有一个module对象用于存放当前模块的信息。为了书写方便，CommonJS也支持export导出内容。export和module.exports不能混用。

在CommonJS中使用require进行模块导入，并且多次导入同一模块只会执行一次，因为导出的模块对象module有一个loaded属性用来记录该模块是否被加载过，默认是false。

**ES6 Module**

ES6 Module的导出方式为export default（默认导出）和export（命名导出），在使用命名导出时，可以使用as关键字对变量重命名。

导入为import。而且ES6 Module会自动采用严格模式，也就是说等于默认在模块头部添加了“use strict”。

**CommonJS与ES6 Module的区别**

动态与静态：CommonJS对模块依赖的解决是动态的，而ES6 Module是静态的。由require可以通过if语句判断来是否加载某个模块可以看出，而且require支持导入的语句是一个表达式。恰恰相反，ES6 Module不支持表达式导入，并且导入导出语句必须在模块的顶层作用域。因此，ES6 Module是静态的模块结构，它在代码的编译阶段即可分析出模块的依赖关系。相比较之下，ES6 Module有以下优势：死代码检测和排除、模块变量类型检查、编译器优化。

值拷贝与动态映射：在导出一个模块时，对于CommonJS来说获取的是一份导出值的拷贝，而ES6 Module中则是值的动态映射，并且这个映射是只读的。例：

CommonJS
```js
// calculator.js
var count = 0
module.exports = {
  count: count,
  add: function(a, b) {
    count += 1
    return a + b
  }
}

// index.js
var count = require('./calculator.js).count
var add = require('./calculator.js).add
console.log(count) // 0 (这里的count是对calculator.js中count值的拷贝)
add(2, 3)
console.log(count) // 0 (calculator.js中变量值的改变不会对这里的拷贝值造成影响)

count += 1
console.log(count) // 1 (拷贝的值可以更改)
```

ES6 Module
```js
// calculator.js
let count = 0
const add = function(a, b) {
  count += 1
  return a + b
}
export {count, add}

// index.js
import {count, add} from './calculator.js
console.log(count) // 0 (对calculator.js中count值的映射)
add(2, 3)
console.log(count) // 1 (实时反映calculator.js中count值的变化)

// count += 1 // 不可更改，会抛出SyntaxError: "count" is read-only
```

## 资源输入输出

**资源入口配置**

Webpack通过context和entry共同决定入口文件的路径。context可以理解为资源入口的路径前缀，在配置时要求必须使用绝对路径。它也可以省略，默认值为当前工程的根目录。entry可以使用字符串、数组、对象甚至是函数进行定义。entry还有一个作用是定义chunk name，在使用字符串和数组的情况下无法定义，默认为main。使用对象定义时chunk name为键名。在webpack优化时可以使用对象的形式为vendor配置一个入口来提升性能。

```js
module.export = {
  context: path.join(__dirname, './src'),
  entry: {
    app: './src/app.js',
    vendor: ['react', 'react-dom', 'react-router']
  }
}
```

这里我们没有为vendor设置入口路径，webpack需要借助插件`optimization.splitChunks`将app和vendor这两个chunk中的公共模块提取出来。这样，就能实现业务代码和第三方模块的分离，利用客户端缓存，可以有效地提升用户后续请求页面时的加载速度。

**资源出口配置**

```js
const path = require('path')

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'assets'),
    publicPath: '/dist/'
  }
}
```

filename: 可以是字符串也可以是模板，使用模板就要用到入口配置中的chunk name，一般多用于多页应用，如下面的例子，name会被替换成chunk name。

```js
module.exports = {
  entry: {
    app: './src/app.js',
    vendor: './src/vendor.js'
  },
  output: {
    filename: '[name].js'
  }
}
```

path：path用于指定资源输出的位置，要求值必须为绝对路径。如：

```js
const path = require('path')

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  }
}
```

publicPath：publicPath用来指定资源的请求位置。

## 预处理器（loader）

webpack可处理不同资源类型的文件，如HTML、CSS、模板、图片、字体等，这些都是通过loader来实现的。

每个loader的本质都是一个函数。

css-loader：css-loader的作用是将模块中的css加载语法进行解析，如@import和url()函数等。

style-loader：style-loader的作用是将解析后的css用style标签的形式插入页面中。因此，style-loader常常与css-loader一起使用。

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        // 排除指定目录下的模块，还有include选项，但exclude优先级更高
        exclude: /node_modules/, 
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
```

babel-loader：babel-loader用来处理ES6+并将其编译为ES5。下载`yarn add bable-loader @babel/core @babel/preset-env --dev`，babel-loader是Babel与Webpack协同工作的模块；@babel/core是Babel编译器的核心模块；@babel/preset-env是Babel官方推荐的预置器，可根据用户设置的目标环境自动添加所需的插件和补丁来编译ES6+代码。

除了使用下面的方式配置以外，babel-loader也支持从.babelrc文件读取Babel配置，因此可以将presets和plugins从webpack配置文件中提取出来，也能达到相同的效果。

```js
rules: [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        // 禁止@babel/preset-env 将ES6 Module转化为CommonJS
        presets: [[
          'env', {
            modules: false, 
          }
        ]]
      }
    }
  }
]
```

file-loader：file-loader用于打包文件类型的资源，并返回其publicPath。

```js
const path = require('path')

module.exports = {
  entry: './app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader'
      }
    ]
  }
}
```

url-loader：url-loader与file-loader作用类似，唯一的不同在于用户可以设置一个文件大小的阈值，当大于该阈值时与file-loader一样返回publicPath，而小于该阈值时则返回文件base64形式编码。

```js
rules: [
  {
    test: /\.(png|jpg|gif)$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10240,
        name: '[name].[ext]',
        publicPath: './assets-path/'
      }
    }
  }
]
```

vue-loader：vue-loader用来处理vue组件，它可以将组件的模板、JS及样式进行拆分。在项目中，实际上它还需要vue-template-compiler来编译Vue模板，以及css-loader来处理样式。下载`yarn add vue-loader vue vue-template-compiler css-loader --dev`

```js
rules: [
  {
    test: /\.vue$/,
    use: 'vue-loader'
  }
]
```

**自定义loader**

假设我们要实现一个loader，它会为所有JS文件启用严格模式`"use strict"`。

首先，创建一个force-strict-loader目录，然后在该目录下执行npm初始化命令。

```
yarn init -y
```

接着创建index.js

```js
module.exports = function(content) {
  var useStrictPrefix = '\'use strict\';\n\n'
  return useStrictPrefix + content
}
```

现在我们可以在Webpack工程中安装并使用这个loader了。

```
yarn add <path-to-loader>/force-strict-loader
```

修改Webpack配置：

```js
module: {
  rules: [
    {
      test: /\.js$/,
      use: 'force-strict-loader'
    }
  ]
}
```

此时对该工程进行打包即可看到效果。

当文件输入和其依赖没有发生变化时，应该让loader直接使用缓存。

```js
// force-strict-loader/index.js
module.exports = function(content) {
  if (this.cacheable) {
    this.cacheable()
  }
  var useStrictPrefix = '\'use strict\';\n\n'
  return useStrictPrefix + content
}
```

通过缓存可以加快webpack打包速度。

loader的配置项通过use.options传进来，如：

```js {8}
module: {
  rules: [
    {
      test: /\.js$/,
      use: {
        loader: 'force-strict-loader',
        options: {
          sourceMap: true
        }
      }
    }
  ]
}
```

要想在loader中获取它需要安装一个依赖库loader-utils，它主要用于提供一些帮助函数。

```
yarn add loader-utils
```

```js
// force-strict-loader/index.js
var loaderUtils = require('loader-utils')

module.exports = function(content) {
  if (this.cacheable) {
    this.cacheable()
  }
  // 获取和打印otions
  var options = loaderUtils.getOptions(this) || {}
  console.log('options', options)

  // 处理content
  var useStrictPrefix = '\'use strict\';\n\n'
  return useStrictPrefix + content
}
```

接下来实现source-map，source-map可以便于实际开发者在浏览器控制台查看源码。

```js
// force-strict-loader/index.js
var loaderUtils = require('loader-utils')
var SourceNode = require('source-map').SourceNode
var SourceMapConsumer = require('source-map').SourceMapConsumer

module.exports = function(content, sourceMap) {
  var useStrictPrefix = '\'use strict\';\n\n'
  if (this.cacheable) {
    this.cacheable()
  }
  // source-map
  var options = loaderUtils.getOptions(this) || {}
  if (options.sourceMap && sourceMap) {
    var currentRequest = loaderUtils.getCurrentRequest(this)
    var node = SourceNode.fromStringWithSourceMap(
      content,
      new SourceMapConsumer(sourceMap)
    )
    node.prepend(useStrictPrefix)
    var result = node.toStringWithSourceMap({
      file: currentRequest
    })
    var callback = this.async()
    callback(null, result.code, result.map.toJSON())
  }
  // 不支持source-map的情况
  return useStrictPrefix + content
}

```

## 样式处理



*持续更新中。。。*
