# bigroom-react-chrome-extension
使用 webpack + react 构建 chrome 插件的开发，并使用 [fe-bigroom](https://github.com/fe-bigroom/bigroom-cli) 脚手架进行本地开发和最终打包等。

## 目录结构
```
  |-- dist                             // 项目构建(webpack)相关代码
  |   |-- dev                          // 本地开发模式下构建后的代码
  |   |-- pord                         // 最终要上线的插件代码
  |-- src                              // 项目开发代码
  |   |-- assets                       // 静态资源（图片、字体等）
  |   |-- commons                      // 通用文件（库、配置、常量等）
  |       |-- config                   // 配置
  |       |-- constants                // 常量
  |   |-- modules                      // 插件模块
  |       |-- background               // background 脚本文件集
  |           |-- background.js        // background 脚本入口文件
  |       |-- content                  // content 脚本文件集
  |           |-- content.js           // 被注入的 content 脚本入口文件
  |       |-- popup                    // popup 脚本文件集
  |           |-- popup.js             // popup 脚本入口文件
  |   |-- pages                        // 测试环境变量
  |       |-- popup.html               // popup.html
  |   |-- manifest.json                // chrome 配置文件
  |-- .eslintignore                    // 忽略 eslint 检查的目录
  |-- .eslintrc.json                   // eslint 规则配置
  |-- .editorconfig                    // 定义代码格式
  |-- .gitignore                       // git 上传需要忽略的文件格式
  |-- README.md                        // 项目说明
  |-- package.json                     // 项目基本信息
```

## 启动
```bash
npm start
```

## 打包
```bash
npm build
```

## 其他

1. 注意：

  由于 manifest.json 中的脚本配置不能使用远程 url，只能使用本地的相对地址，所以我们 popup 可以使用 html 作为中间层来加载开发模式下的 webpack 的远程 url 进行开发。

2. 建议：

	popup、background、content(inject)之间的通信建议以 background 作为中间传递层，防止维护混乱问题。
