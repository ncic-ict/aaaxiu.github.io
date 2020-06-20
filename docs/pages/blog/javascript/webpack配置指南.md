# webpack配置指南
<br />

::: tip
本文根据《Webpack实战：入门、进阶与调优》整理。
:::

## webpack简介

> 要用webpack首先得知道为什么要用它，webpack的最大优势就是可以实现模块化。然而，JS为什么要模块化呢？这是因为传统的JS开发：污染全局作用域、需要手动维护JS的加载顺序、每个script标签都意味着需要向服务器发起一次静态请求。而模块化可以很好解决上述问题：模块之间的作用域是相互隔离的、通过导入和导出语句可以很清晰的看到模块间的依赖关系、模块可以借助工具打包从而实现资源合并。


前端在很早以前就出现了模块化的思想。到2015年，ES6正式定义了JS的模块标准。但是大多数的npm模块爱是CommonJS的形式，浏览器并不支持。模块打包工具的任务就是解决模块间的依赖，使其打包后的结果能运行在浏览器上。

这里要说到webpack相对于其他打包工具的优势，如Parcel、Rollup等。

- Webpack默认支持多种模块标准，包括AMD、CommonJS以及ES6模块。
- Webpack有完备的代码分割解决方案。
- Webpack可以处理各种类型的资源。除了JS以外，还能处理样式、模板，图片等。
- Webpack有强大得社区支持。

**进入正题：**

我的代码同步在[github](https://github.com/aaaxiu/Webpack_Config)上，可对比查看。

**安装：**

Webpack可运行在绝大部分的操作系统，它的唯一依赖是Node。有一点需要注意的是，Node推荐全局安装，Webpack推荐本地安装，即安装在项目内。这样可保证项目在多人协作时能保证Webpack版本一致。还有，部分依赖于Webpack的插件会调用项目中的Webpack的内部模块，这种情况下仍然需要在项目本地安装Webpack。

首先新建一个工程目录，使用`yarn init`进行项目初始化。接下来执行安装Webpack的命令：

```
yarn add webpack webpack-cli 
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
```
"scripts": {
  "build": "webpack --entry=./index.js --output-filename=bundle.js --mode=development"
}
```

注意，这里可以直接使用模块所添加的指令了，用“webpack”取代了“npx webpack”。随意修改文件后，这次执行`yarn build`同样可以打包成功。

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

需要注意的是，output字段筱使用绝对路径。修改package.json的脚本为`"build":"webpack"`，再次对内容进行修改并打包。可以发现配置文件生效了。

**webpack-dev-server**

每次修改完文件后都要重新进行打包并手动刷新网页当然是不能接受的。幸好webpack社区为我们提供了一个便捷的本地开发工具---webpack-dev-server。首先进行安装：
```js
yarn add webpack-dev-server
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

配置完成后，打开`localhost:8080`查看使用webpack-dev-server的结果。这里有一点需要注意，直接使用webpack开发和使用webpack-dev-server有一个很大的区别，前者每次都会生成bundle.js，而webpack-dev-server只是将打包结果放在内存中，并不会写入实际的bundle.js，在每次webpack-dev-server接收到请求时都只是将内存中的打包结果返回给浏览器。webpack-dev-server还有一项很便捷的特性就是live-reloading（自动刷新）---修改源文件会自动刷新页面同步更新。

## 模块打包

*持续更新中。。。*
