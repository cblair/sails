const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./assets/src/index.js"),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ],
  },
  resolve: {
    extensions: ["*", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "./assets"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./assets/src"),
    hot: true,
  },
  devtool: "eval-cheap-module-source-map" // "source-map",
};