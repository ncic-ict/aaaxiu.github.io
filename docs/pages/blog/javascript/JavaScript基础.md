# JavaScript基础

## 闭包（closure）

> 所谓闭包指的是有权访问另一个函数作用域中变量的函数。创建闭包的常见方式，就是在一个函数内部创建另一个函数。本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

```js
function fn1() {
  var n = 999
  return function() {
    alert(n)
  }
}

var result = fn1()
result()
```

上面的例子fn1函数中返回了一个匿名函数，这个匿名函数访问了fn1中的变量n。即使这个匿名函数被返回，然后在其他地方调用了，但它仍然可以访问到n。因此，我们可以在函数体外访问到函数体内的变量。这就是闭包的两大用处之一---读取函数内部的变量，另一个是让这些变量始终保存在内存中。看一下这里例子就明白了：

```js
function fn1() {
  var n = 999
  // 注意nAdd是全局变量
  nAdd = function() {
    n += 1
  }
  function fn2() {
    console.log(n)
  }
  return fn2
}

var result = fn1()
result() // 999
nAdd()
result() // 1000
```

上例中fn2被赋值给了一个全局变量，因此它始终在内存中，而fn2的存在依赖于fn1，因此fn1也始终在内存中。

下面的例子会返回一个函数数组，我们期望函数返回当前位置的索引：

```js
function createFunctions() {
  var result = []
  for(var i = 0; i < 10; i++) {
    result[i] = function() {
      return i
    }
  }
  return result
}

createFunctions()[0]() // 10
```

实际上，无论是第几项返回的都是10。因为每个函数的作用域链中都保存着createFunctions()函数的活动对象，所有他们引用的都是同一个变量i。要使函数符合预期，可以这样：

```js {4,5,6,7,8}
function createFunctions() {
  var result = []
  for(var i = 0; i < 10; i++) {
    result[i] = function(num) {
      return function() {
        return num
      }
    }(num)
  }
}
```

这一次，我们没有直接将闭包赋值给数组。而是定义了一个匿名函数，并将立即执行函数的结果赋值给了数组。由于函数参数是按值传递的，所以就会将变量i的当前值复制给参数num。这样一来，result数组中的每个函数都有自己num变量的一个副本，因此就可以返回各自不同的值了。

严格来说，内存泄漏并不是闭包的缺点，这是IE9之前的版本对JScript和COM对象使用不同的垃圾回收例程所导致的。由于闭包的特性，函数体内的变量会被保存在内存中不被释放，因此频繁的使用闭包还是会造成大量的内存消耗，影响网页性能。解决办法是在退出函数前，将不使用的局部变量删除。通过一个例子来看看：

## 原型和原型链

[原型和原型链](./原型和原型链.md)








更新中。。。

