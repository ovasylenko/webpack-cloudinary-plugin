import webpack from "webpack";
import webpackOptions from "./resources/webpack.config";

describe("Plugin test", () => {
    it("should load", (done) => {
        webpack(webpackOptions, (error, stats) => {
            if (error) {
                done(error);
            }

            done();
        });
    });
});