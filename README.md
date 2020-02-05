# Bee web采集系统 chrome调试工具

Bee web采集系统 chrome调试工具。

## 概述

基于 Vue 开发的Chrome扩展。用来辅助 [Bee](https://github.com/zjiang121143210/bee) 数据采集系统的测试。

[Bee](https://github.com/zjiang121143210/bee) 一个开源Web数据采集系统，欢迎交流。

项目大部分代码在 `src/devtools` 文件夹下。

## 使用方式

[bee-devtools.crx](http://clew.fun/bee-devtools.crx)

下载上方文件，并重命名为`bee-devtools.zip`,然后在chrome扩展管理页**加载已解压的扩展程序**。

或者直接加载 **dist** 文件夹。

## 使用 Bee devtools 测试数据

[bee-devtools.crx](http://clew.fun/bee-devtools.crx)

在空白处点击右键 > 检查（或 F12），打开Chrome浏览器的Dev Tool，可以看到出现了一个新的Tab为：GIO Web Debugger。实施技术顾问就可以在这个Tab页面上进行添加代码后的质量验证工作了。

![bee](http://bee-img.test.upcdn.net/bee-devtools.png)
