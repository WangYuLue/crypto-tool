# 使用须知

## 场景

有些内容需要加密储存，例如 密码，私钥，日记 等等，这个小工具就是做这件事

## 如何使用

### 第一步：修改 `config.ini` 配置文件

```js
decDir = './.assets'
encDir = './assets'
```

其中：

- `decDir` 是密钥明文存放的目录
- `encDir` 是密钥加密后存放的目录

> tips: 如果写相对路径，则是相对本项目的路径

### 第二步：使用提供的命令

- `./encrypt` 加密明文目录中的文件
- `./decrypt` 解密密文目录中的文件
- `./clear`   删除明文目录中的文件

> tips: 目前的加解密只针对目标目录一层，不会递归目录加密

## node version

v14.16.1
