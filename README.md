# webpack-cloudinary-plugin
Upload your Webpack-generated assets to Cloudinary.

This plugin taps into the final phase of your [Webpack](http://webpack.js.org/) build process, in order to gather the generated assets (image sprites, CSS files, JS bundles and many more) and upload them to the CDN [Cloudinary](https://cloudinary.com/).

## Install
```npm i --save-dev webpack-cloudinary-plugin```

```yarn add webpack-cloudinary-plugin```

## Usage
### **Options**

| Name | Type | Default | Description |
|:----:|:----:|:-------:|:------------|
| ```credentials``` | ```{Object}``` | ```undefined``` | The credentials that allow you to upload images to your cloud (signed upload). They are composed of: <br/>- `cloudName`<br/>- `api_key`<br/>- `api_secret` |
| ```remote``` | ```{String}``` | ```""``` | The folder structure in which your assets are going to be saved. If let in default, the assets are saved in your cloud root. |
| ```resource_type``` | ```{String}``` | ```"auto"``` | The type of assets you're uploading. If let in default, all types of files will be uploaded. Possible options are:<br/>- `image`<br/>- `raw`<br/>- `video`<br/>- `auto`<br/>If you change this to `image`, for example, and try to upload a `.js` file, Webpack will output an error and the assets will not be uploaded.|

An example of how these options might build up in Webpack config file:

#### webpack.config.js
```javascript
{
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new WebpackCloudinaryPlugin({
      credentials: {
          cloud_name: "testCloud",
          api_key: "12345",
          api_secret: "54321"
      },
      remote: "assets",
      resource_type: "image"
    })
  ]
}
```

For other, more fine-grained options, check [Cloudinary API reference](https://cloudinary.com/documentation/image_upload_api_reference#upload_method).