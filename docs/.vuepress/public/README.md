<!--
 * @Description: README
 * @Author: 林河
 * @Date: 2020-05-23 16:21:12
 * @LastEditTime: 2020-05-27 17:02:52
 * @LastEditors: 林河
--> 
# 林河前端之路

[地址](https://aaaxiu.github.io)

### 项目启动方式和打包方式

1. `yarn dev` 直接启动项目，如果没有全局安装 `yarn` 和 `vuepress` 先把它们安装再执行（ vuepress 有默认的热更新模块，但修改 .vuepress/config.js 配置文件并不会同步更新 ）。

2. 执行 `yarn build` 打包执行本地打包。

  有两个分支， `master` 存放的是生成的静态文件， `source_code` 存放的是网站的原始文件，一般来说不需要去切换分支，只需要在 `source_code` 上开发就好，完成之后提交和 push ，生成静态文件只需要执行 `yarn deploy` 即可（无论你当前在哪个分支，它执行的是项目目录下的 deploy.sh 文件 ）。但是需要注意的是 `yarn deploy` 依赖于 GitBash。也就是说要在 git 的命令行中运行。 

3. 执行 `yarn deploy` 打包项目并发布到 github 。

### 添加页面方式

> 所有的页面都在 docs/pages/ 下面，根据 tabs 区分不同的文件夹

1. 首先在对应 tabs 下创建 markdown 文件，如 blog/javascript 下的“前端实现图片压缩上传.md”

2. docs/.vuepress 是 vuepress 配置相关的文件夹，打开 docs/.vuepress/config.js 。在 `themeConfig.sidebar` 下添加配置。

  ``` js
  export default = {
    themeConfig: {
      // ...
      sidebar: {
        '/pages/blog/': [ // 注意前后都有斜线    
          {
            title: 'JavaScript',   // 一级菜单名称
            collapsable: false, // false为默认展开菜单, 默认值true是折叠,
            children: [
              ['javascript/前端实现图片压缩上传.md', '前端实现图片压缩上传']  // [跳转地址，侧边栏名称]
              // ...
            ]
          }
        ]
      }
    }
  }
```

3. 在 blog/index.md 中添加对应的文件路径（这是 tabs 的默认页面，可一览整个目录下的文章，方便快速跳转 ）。

### 常用功能

1. 使用标签图片方式，图片存放到 docs/.vuepress/public 下（这个目录下都是静态文件）。

  ```
  <img :src="$withBase('/code.jpg')" alt="code">
  ```

2. 使用表情，全部表情在 [markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)

  :100:
  :grinning:
  :pout:
  :pray:
  :+1:
  :selfie:
  :man_teacher:
  :ok_woman:
  :couplekiss_man_woman:
  :mouse:
  :pig:
  :sun_with_face:
  :eggplant:



3. vue 风格提醒

  ```
  ::: tip
  这是一个提示
  :::
  ```

  另外还有 warning 、danger 、 details 。

