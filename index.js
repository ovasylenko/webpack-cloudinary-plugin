"use strict";

import isEmpty from "lodash/isEmpty";
import cloudinary from "cloudinary";

export class WebpackCloudinaryPlugin {
    get defaultOptions() {
        return {

        }
    }

    constructor(options = {}) {
        this.options = Object.assign(options, this.defaultOptions);
    }

    apply(compiler) {
        compiler.hooks.done.tapAsync(
            "WebpackCloudinaryPlugin",
            (stats, callback) => {
                // console.log('This is an example plugin!');
                // console.log('Here’s the `compilation` object which represents a single build of assets:', compilation);

                const compilation = stats.compilation;

                if (!Object.keys(compilation.assets)) {
                    compilation.errors.push(new Error("WebpackCloudinaryPlugin: No files were found in the dist folder."));
                }

                if (isEmpty(this.options.credentials)) {
                    compilation.errors.push(new Error("WebpackCloudinaryPlugin: Cloudinary credentials were not provided."));
                }

                if(!compilation.errors.length) {
                    cloudinary.config(this.options.credentials);
                    const output = compilation.compiler.outputPath;

                    console.log(output);
                }

                callback();
            }
        )
    }
}