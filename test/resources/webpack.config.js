var { WebpackCloudinaryPlugin } = require("../../index");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "development",

    context: __dirname + "/mocks",

    entry: "./index.js",

    output: {
        path: __dirname + "/dist"
    },

    plugins: [
        new WebpackCloudinaryPlugin({
            credentials: {
                cloud_name: "testCloud",
                api_key: "12345",
                api_secret: "54321"
            },
            // credentials: {
            //     cloud_name: "arrudaje",
            //     api_key: "769927518764481",
            //     api_secret: "1qcVPHYDJaP0NQCUBEQGkVEJ_Js"
            // },
            remote: "static"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.js$/i,
                use: "babel-loader"
            }
        ]
    }
}