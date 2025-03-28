const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //Entry point for bundling - starting from index.tsx
  entry: "./src/index.tsx",

  //Output configuration - bundeled file goes to dist/bundle.js
  output: {
    path: path.resolve(__dirname, "dist"), // Absolute path to dist folder
    filename: "bundle.js", // Name of the output file
  },

  //Set mode to developement for debugging
  mode: "development",

  //Resolve file extention for ts, tsx, jsx, js
  resolve: {
    extentions: [".tsx", ".jsx", ".ts", ".js"],
  },

  //Module rules - define how file should be processed
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx|jsx)$/,
        exculde: /node_modules/, //skip node_module for better performance
        use: {
          loader: "babel-loader", //Use babel totranspile the file
        },
      },
    ],
  },

  //Plugins - Generate HTML and inject JS
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Use the custom template
    }),
  ],

  //Devserver configuration for local developement
  devServer: {
    port: 3000,
    static: "./dist",
    hot: true, // Enable hot module replacement(HOT) for live relaoding
  },
};
