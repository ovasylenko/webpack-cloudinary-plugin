import sinon from "sinon";
import webpack from "webpack";
import cloudinary from "cloudinary";
import webpackOptions from "./resources/webpack.config";
import assert from "assert";

describe("Plugin test", () => {
    let uploadStub;

    describe("Test load", () => {
        before(() => {
            sinon.stub(cloudinary, "config");
            uploadStub = sinon.stub(cloudinary.uploader, "upload");
        });

        it("should load without errors if config is correct", done => {
            webpack(webpackOptions, stats => {
                if (stats.compilation.errors.length) {
                    done(stats.compilation.errors[0]);
                    return;
                }
    
                done();
            });
        });

        after(() => {
            uploadStub.restore();
        });
    });

    describe("Test data", () => {
        beforeEach(() => {
            if(uploadStub) uploadStub.restore();
            uploadStub = sinon.stub(cloudinary.uploader, "upload");
        });

        it("should call upload the right amount of times", done => {
            webpack(webpackOptions, stats => {
                assert.equal(uploadStub.callCount, 2);
                done();
            });
        });

        it("should call upload with the right arguments", done => {
            webpack(webpackOptions, stats => {
                uploadStub.firstCall.calledWithMatch(/main\.css/, sinon.match.has("public_id", "static/main.css"));
                uploadStub.secondCall.calledWithMatch(/main\.js/, sinon.match.has("public_id", "static/main.js"));
                done();
            });
        });
    });
});