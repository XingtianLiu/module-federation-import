const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
	mode: "development",
	devtool: "cheap-module-source-map",
	devServer: {
		contentBase: './dist'
	},
	entry:"./src/parent.js" ,
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: "http://localhost:8080/",
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new ModuleFederationPlugin({
			name: "childApp",
			library: { type: "var", name: "childApp" },
			filename: "remoteEntry.js",
			exposes: {
			  "./module": "./src/child.js"
			},
			remotes:{
				childApp:"childApp"
			},
			shared: ["vue", "vue-router"],
		})
	]
}