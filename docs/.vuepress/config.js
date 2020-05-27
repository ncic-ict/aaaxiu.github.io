module.exports = {
  title: '林河前端之路',
  description: '前端笔记和面试整理',
  base: '/', // github
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/linhe.jpg' }],
  ],
  base: '/', // 这是部署到github相关的配置 下面会讲
  // markdown: {
  //   lineNumbers: true // 代码块显示行号
  // },
  themeConfig: {
    activeHeaderLinks: false, // 默认值：true
    smoothScroll: true, // 启动页面滚动
    activeHeaderLinks: false, // 不改变页面hash值（优化项）
    sidebarDepth: 2, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
    // lastUpdated: 'Last Updated',// 文档更新时间：每个文件git最后提交的时间,
    logo: '/linhe.jpg',
    nav:[
      { text: 'Home', link: '/'},
      { text: '博文', link: '/pages/blog/' }, // 内部链接 以docs为根目录
      // { text: '面试题', link: '/pages/interview/' },
      { text: '代码块', link: '/pages/code/'},
      { text: 'GitHub', link: 'https://github.com/aaaxiu/aaaxiu.github.io'}  
    ],
    //侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
    sidebar: {
      '/pages/blog/': [         
        {
          title: 'JavaScript',   // 一级菜单名称
          collapsable: false, // false为默认展开菜单, 默认值true是折叠,
          children: [
            ['javascript/前端实现图片压缩上传.md', '前端实现图片压缩上传'],  // [跳转地址，侧边栏名称]
            ['javascript/数组去重方式.md', '数组去重方式'], // [文件路径，侧边栏名称]
            ['javascript/encodeURI和encodeURIComponent.md', 'encodeURI和encodeURIComponent'],
            ['javascript/原型和原型链.md', '原型和原型链'],
            ['javascript/防抖和节流.md', '防抖和节流']
          ]
        },
        {
          title: 'Vue',   // 一级菜单名称
          collapsable: false, // false为默认展开菜单, 默认值true是折叠,
          children: [
            ['vue/Vue项目性能优化.md', 'Vue项目性能优化'],
            ['vue/vue_history模式配置.md', 'vue_history模式配置'],
            ['vue/vue实战项目总结.md', 'vue实战项目总结'],
            ['vue/解决element-ui2.10.x版本以上使用远程搜索的Bug.md', '解决element-ui2.10.x版本以上使用远程搜索的Bug'],  // [跳转地址，侧边栏名称]
            ['vue/VUE面试题.md', 'VUE面试题'],
          ]
        },
        {
          title: 'Git',   // 一级菜单名称
          collapsable: false, // false为默认展开菜单, 默认值true是折叠,
          children: [
            ['git/Git常用命令.md', 'Git常用命令'], 
            ['git/git生成多个公钥.md', 'git生成多个公钥'], 
          ]
        },
        {
          title: 'Others',
          collapsable: false, // false为默认展开菜单, 默认值true是折叠,
          children: [
            ['others/跨域解决方案.md', '跨域解决方案'],
            ['others/个人vscode插件和配置.md', '个人vscode插件和配置'],
            ['others/彻底理解浏览器的缓存机制.md', '彻底理解浏览器的缓存机制'],
            ['others/在第三方页面调用微信接口.md', '在第三方页面调用微信接口'],
            ['others/移动端遮罩阻止滚动方案.md', '移动端遮罩阻止滚动方案'],
            ['others/css3伪类.md', 'css3伪类']
          ]
        }
      ],
      '/pages/code/': [
        { 
          title: '代码块', 
          collapsable: false,
          children: [
            ['常用scss函数表.md', '常用scss函数表'],
            ['公共方法汇总.md', '公共方法汇总'],
            ['椭圆运动轨迹.md', '椭圆运动轨迹'],
            ['一行代码实现时间戳转时分秒.md', '一行代码实现时间戳转时分秒']
            // 代码块页添加其他文章。。。
          ]
        }
      ],
      // '/pages/interview/': [
      //   {
      //     title: 'Interview',
      //     collapsable: false,
      //     children: [
      //       ['数组去重方式.md', '数组去重方式'], // [文件路径，侧边栏名称]
      //       ['VUE面试题.md', 'VUE面试题'],
      //       ['encodeURI和encodeURIComponent.md', 'encodeURI和encodeURIComponent'],
      //       ['原型和原型链.md', '原型和原型链']
      //     ]
      //   }
      // ]
      
      //...可添加多个不同的侧边栏，不同页面会根据路径显示不同的侧边栏
    }
  }
}
