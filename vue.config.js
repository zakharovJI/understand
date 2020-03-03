const path = require('path');

module.exports = {
 /* alias: {
    "@": require("path").resolve(__dirname, "src")
  },*/
  productionSourceMap: process.env.NODE_ENV !== 'production',
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "./src/assets/styles/main.scss";
        `,
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('scss')
      .test(/\.scss/)
      .use('import-glob-loader')
      .loader('import-glob-loader')
      .end();

    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/symbols'))
      .end();

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/symbols'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: filePath => path.basename(filePath, '.svg'),
      });
  },
};

function resolve(dir) {
  return path.join(__dirname, './', dir);
}
