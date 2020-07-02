# Css3和Html5新特性不完全手册

> 首先，不完全手册所列的是个人认为比较重要和常用的特性，不常用的没有列进来。

## Css3新特性

#### 选择器

   选择器             |        示例            |         示例说明               
   :---:             |       :---:           |         :---
:first-of-type       | p:first-of-type       | 选择每个p元素是其父级的第一个p元素
:last-of-type        | p:last-of-type        | 选择每个p元素是其父级的最后一个p元素
:nth-child(n)        | p:nth-child(2)        | 选择每个p元素是其父级的第二个p元素
:nth-last-child(n)   | p:nth-last-child(2)   | 选择每个p元素是其父级的第二个p元素，从最后一个子项计数
:nth-of-type(n)	     | p:nth-of-type(2)	     | 选择每个p元素是其父级的第二个p元素
:nth-last-of-type(n) | p:nth-last-of-type(2) | 选择每个p元素的是其父级的第二个p元素，从最后一个子项计数
:last-child          | p:last-child          | 选择每个p元素是其父级的最后一个子级。
:enabled             | input:enabled         | 选择每一个已启用的输入元素
:disabled	           | input:disabled        | 选择每一个禁用的输入元素
:checked             | input:checked         | 选择每个选中的输入元素

#### 边框

- border-radius 设置边框圆角

- box-shadow 设置盒子阴影 

#### 渐变

- 线性渐变

> background: linear-gradient(direction, color-stop1, color-stop2, ...);

- 径向渐变

> background: radial-gradient(center, shape size, start-color, ..., last-color);

#### 文本效果

- text-outline 规定文本的轮廓

- text-shadow	向文本添加阴影

- text-wrap	规定文本的换行规则

#### 字体

```css
<style>
    @font-face{
        font-family: myFirstFont;
        src: url(sansation_light.woff);
    }
    div{
        font-family: myFirstFont;
    }
</style>
```

#### 转换和变形

transform 

#### 过渡

transition 

#### 动画

@keyframes

```css
@keyframes myfirst{
  0% {
    background: red;
  }
  25% {
    background: yellow;
  }
  50% {
    background: blue;
  }
  100% {
    background: green;
  }
}
```

#### 盒模型

[参考Css基础](./Css基础.html/#盒模型)

#### Flex布局

#### 多媒体查询

## Html5新特性

#### 语义化标签

#### 增强型表单

#### 视频和音频

#### Canvas

#### SVG

#### 地理位置

#### 拖放API

#### WebStorage本地存储

#### WebSocket






更新中。。。






<Vssue :title="$title" />
