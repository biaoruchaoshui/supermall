module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // @ : src目录
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}