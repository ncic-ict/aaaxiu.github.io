# Git生成多个公钥
<br />

> 需求背景：我有一个 github 账户用来维护个人的博客，公司用的是 gitlab ，两个账号的邮箱不同，无法公用一个公钥文件。因此得创建多个公钥不会导致项目的 git 冲突。

**1. 创建文件**

生成 ssh key 的命令是：`ssh-keygen -t rsa -C "your_email@example.com"`。

输入该命令后有连续的三个提示输入，第一个是你要创建的 ssh key 的文件名。我们就是通过第一个命令来创建不同的秘钥文件（如果不指定文件名会自动覆盖）。第二和第三次输入为秘钥口令，一般不填，直接回车。

这里我设置公司的公钥文件名为默认的 id_rsa ，自己的公钥文件名为 id_rsa_linhe 。这样就会根据公司邮箱和个人邮箱生成对应文件。

**2. 配置**

找到 key 所在的地方（我习惯用 everything 直接搜本地磁盘），创建 config 文件（无后缀），添加以下内容：

```
Host github.com
IdentityFile ~/.ssh/id_rsa_linhe_github
User your_email@example.com
```

::: warning
注意默认的 id_rsa 不需要配置。
:::

| 字段 | 说明 |
| -- | -- |
| Host | 远程主机地址 |
| IdentityFile | 私钥的文件路径及文件名称 |
| User | 用户 |
| Port | 远程主机上连接的端口号 |
| HostName | 要登录的真实主机名。数字IP地址也是允许的 |


**3. 复制公钥到服务器**

这个比较简单，就不累述了，网上教程很多。




<Vssue :title="$title" />
