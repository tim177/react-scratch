// Import required modules
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // Entry point for bundling - starting from index.tsx
  entry: "./src/index.tsx",

  // Output configuration - bundled file goes to dist/bundle.js
  output: {
    path: path.resolve(__dirname, "dist"), // Absolute path to dist folder
    filename: "bundle.js", // Name of the output file
  },

  // Set mode to development for debugging
  mode: "development",

  // Resolve file extensions for TS, JSX, and JS
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  // Module rules - Define how files should be processed
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // Match JS, TS, JSX, or TSX files
        exclude: /node_modules/, // Skip node_modules for better performance
        use: {
          loader: "babel-loader", // Use Babel to transpile the code
        },
      },
    ],
  },

  // Plugins - Generate HTML and inject JS
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Use the custom template
    }),
  ],

  // DevServer configuration for local development
  devServer: {
    port: 3000, // Serve on localhost:3000
    static: "./dist", // Serve from dist folder
    hot: true, // Enable Hot Module Replacement (HMR) for live reloading
  },
};
