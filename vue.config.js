const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      open: true,
      port: 8888,
      host: "localhost",
    },
  }, //更灵活 配置【网站标题】
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "黑马头条";
      return args;
    });
  },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${path.join(
              __dirname,
              "src/styles/theme.theme"
            )}";`,
          },
        },
      },
    },
  },
});
