"use strict";

export class WebpackCloudinaryPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.done.tapAsync(
            "WebpackCloudinaryPlugin",
            (stats, callback) => {
                // console.log('This is an example plugin!');
                // console.log('Here’s the `compilation` object which represents a single build of assets:', compilation);

                const compilation = stats.compilation;

                if (!Object.keys(compilation.assets)) {
                    console.error("No files were found in the dist folder.");
                    return callback();
                }

                const output = compilation.compiler.outputPath;

                callback();
            }
        )
    }
}