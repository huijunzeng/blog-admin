// 使用vue-cli3创建项目,如果需要覆盖webpack的配置，则需要在项目的根目录下新建vue.config.js文件，来配置新的配置。启动项目时，会被自动加载
const path = require('path')
const webpack = require('webpack')

// 导出一个含有配置选项的对象
module.exports = {
    // 部署生产环境和开发环境下的URL：可对当前环境进行区分，默认为'/'
    publicPath: process.env.NODE_ENV === 'production' ? '/public/' : '/',
    // 当运行 build 时生成的生产环境构建文件的目录
    outputDir: 'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: "static",
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)
    indexPath:'index.html',
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
    productionSourceMap: false,
    // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
    filenameHashing: false,
    // 是否在保存的时候使用 `eslint-loader` 进行检查。 有效的值：`ture` | `false` | `"error"`  当设置为 `"error"` 时，检查出的错误会触发编译失败
    lintOnSave: true,

    // webpack-dev-server 相关配置
    devServer: {
        // 自动打开浏览器
        open: true,
        // 默认检查hostname，如果hostname不是配置内的，将中断访问，所以设置为false
        disableHostCheck: true,
        // host主机
        host: 'localhost',
        // 端口
        port: 8066,
        // 是否为https
        https: false,
        // 热更新
        hotOnly: false,
        // 使用代理  当前端应用和后端 API 服务器没有运行在同一个主机上，需要在开发环境下将 API 请求代理到 API 服务器
        // 请求 /api/xxx 接口会被代理请求 http://localhost:8081/xxx, 例如 /api/user 会被代理请求 http://localhost:3000/user
        // 匹配规则可配置多个
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                // 目标代理服务器地址
                target: 'http://localhost:8081',
                // 允许跨域
                changeOrigin: true,
                // 如果是https接口，需要配置这个参数为true
                secure: false,
                // 路径重写
                pathRewrite: {
                    // 如果接口不带api，则设置以下，最终效果是/api/login  =>  http://localhost:8081/login
                    // '^/api': '/rest/' 如果接口不带api，则设置以下，最终效果是/api/login  =>  http://localhost:8081/rest/login
                    '^/api': ''
                }
            },
        },
    },

    // CSS 相关配置
    css: {
        // 是否使用css分离插件，将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
        // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
        extract: true,

        // 是否开启 CSS source map？
        sourceMap: true,

        // 为预处理器的 loader 传递自定义选项。比如传递给
        // sass-loader 时，使用 `{ sass: { ... } }`。
        loaderOptions: {},

        // 为所有的 CSS 及其预处理文件开启 CSS Modules。
        // 这个选项不会影响 `*.vue` 文件。
        modules: false
    },

    // Webpack 相关配置
    configureWebpack: {
        // 使用@省略公共路径来import资源  可自定义配置一些其他别名
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
}