import { WebpackCloudinaryPlugin } from "../../index";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

module.exports = {
    mode: "development",

    context: `${__dirname}/mocks`,

    entry: "./index.js",

    output: {
        path: `${__dirname}/dist`
    },

    plugins: [
        new WebpackCloudinaryPlugin(),
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