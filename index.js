"use strict";

const isEmpty = require("lodash/isEmpty");
const cloudinary = require("cloudinary");
const { FileNotFoundError, AbsentCredentialsError, GeneralError } = require("./lib/errors");

const PLUGIN_NAME = "WebpackCloudinaryPlugin";

class WebpackCloudinaryPlugin {
    get defaultOptions() {
        return {

        }
    }

    constructor(options = {}) {
        this.options = {...options, ...this.defaultOptions};
    }

    apply(compiler) {
        compiler.hooks.done.tapAsync(
            PLUGIN_NAME,
            (stats, callback) => {
                const compilation = stats.compilation;

                if (!Object.keys(compilation.assets)) {
                    compilation.errors.push(new FileNotFoundError(PLUGIN_NAME));
                }

                if (isEmpty(this.options.credentials)) {
                    compilation.errors.push(new AbsentCredentialsError(PLUGIN_NAME));
                }

                if (!compilation.errors.length) {
                    try {
                        cloudinary.v2.config(this.options.credentials);

                        const uploadEntries = [];

                        Object.entries(compilation.assets)
                            .filter(asset => asset[1].emitted && !!asset[1].existsAt)
                            .forEach(asset => {
                                const key = asset[0];
                                const value = asset[1];

                                uploadEntries.push(
                                    cloudinary.v2.uploader.upload(
                                        value.existsAt,
                                        {...this.options, public_id: `${this.options.remote}${key}`},
                                        (result, error) => 
                                            ((result && result.error) || error) && compilation.errors.push(
                                                new GeneralError("CloudinaryUploadError", PLUGIN_NAME, "File has not been uploaded to Cloudinary.")
                                            )
                                    )
                                );
                            });

                            Promise.all(uploadEntries)
                                .then(() => callback())
                                .catch(error => {
                                    compilation.errors.push(
                                        new GeneralError("CloudinaryUploadError", PLUGIN_NAME, error.message)
                                    );
                                    callback();
                                });

                    } catch (error) {
                        console.log(error)
                        compilation.errors.push(new GeneralError("Error", PLUGIN_NAME, JSON.stringify(error)));
                        callback();
                    }
                } else {
                    callback();
                }
            }
        )
    }
}

module.exports = { WebpackCloudinaryPlugin };