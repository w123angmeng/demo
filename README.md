# demo
简介：qiankun + ModuleFederationPlugin  

------

## 1. 分支说明

```
分支：MF // 仅ModuleFederationPlugin 组件共享正常
分支：onlyqiankun // 仅qiankun 父子项目访问正常 主项目用MF组件共享正常
（默认）分支：qiankun // qiankun + MF 报错找不到子项目生命周期函数 ！！！！！！
```



## 2. 项目说明

```
main // qiankun入口仓库 vue项目
app1 // 子仓库 vue项目
app2 // 子仓库 vue项目
common // 公共组件库 ModuleFederationPlugin vue项目
```



## 2. 项目启动

```
// 启动主项目
cd main
cnpm i
npm run serve

// 启动子项目
cd app1/app2
cnpm i
npm run serve
```

## 3. 环境版本

```
vue-cli 版本：@vue/cli 5.0.6 （[Vue 2] dart-sass, babel, router, vuex, eslint）
qiankun 版本：
```

