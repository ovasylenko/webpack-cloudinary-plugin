import sinon from "sinon";
import webpack from "webpack";
import cloudinary from "cloudinary";
import webpackOptions from "./resources/webpack.config";

describe("Plugin test", () => {
    before(() => {
        sinon.stub(cloudinary, "config");
    });

    it("should load without errors if config is correct", (done) => {
        webpack(webpackOptions, (error, stats) => {
            if (stats.compilation.errors.length) {
                done(stats.compilation.errors[0]);
                return;
            }

            done();
        });
    });
});