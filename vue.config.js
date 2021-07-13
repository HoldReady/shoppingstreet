module.export = {
  // 这里就表示是对 webpack 的路径进行修改
  configureWebpack:{
    resolve:{
      alias:{
        // cli3中，内部已经帮你配置好了一个路径简写
        //  'src':'@' ,所以在这里我们可以直接使用 @
        // 但是在 cli2 中，是不能这样写的
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
      }
    }
  }
}