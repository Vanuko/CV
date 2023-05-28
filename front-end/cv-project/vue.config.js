const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
});

// module.exports = {
//   devServer: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8080',  // Replace with your PHP server's URL
//         changeOrigin: true,
//         pathRewrite: {
//           '^/api': ''
//         }
//       }
//     }
//   }
// };