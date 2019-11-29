import { WebpackCloudinaryPlugin } from "../../index";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

module.exports = {
    mode: "development",

    context: `${__dirname}/mocks`,

    entry: "./index.js",

    output: {
        path: `${__dirname}/dist`
    },

    plugins: [
        new WebpackCloudinaryPlugin({
            // credentials: {
            //     cloud_name: "testCloud",
            //     api_key: "12345",
            //     api_secret: "54321"
            // }
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
            }
        ]
    }
}