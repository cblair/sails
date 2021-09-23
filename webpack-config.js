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
    // Sends route urls on refresh/manual entry to our react SPA.
    historyApiFallback: true,
    // Allows us to request the api from web forms around CORS.
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:1337/"
    }
  },
  devtool: "eval-cheap-module-source-map" // "source-map",
};