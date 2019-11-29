import webpack from "webpack";
import webpackOptions from "./resources/webpack.config";

describe("Plugin test", () => {
    it("should load", (done) => {
        webpack(webpackOptions, (error, stats) => {
            if (stats.compilation.errors.length) {
                done(stats.compilation.errors[0]);
            }

            done();
        });
    });
});