"use strict";

export class WebpackCloudinaryPlugin {
    apply(compiler) {
        compiler.hooks.done.tapAsync(
            "WebpackCloudinaryPlugin",
            (compilation, callback) => {
                console.log('This is an example plugin!');
                console.log('Here’s the `compilation` object which represents a single build of assets:', compilation);

                callback();
            }
        )
    }
}