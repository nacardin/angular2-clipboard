const webpack = require('webpack');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs

var commonConfig = {
  devtool: 'source-map',

  entry: {
    'index': './src/index.ts'
  },

  output: {
    path: './dist/',
    library: 'xng',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  externals: {
    "clipboard": "clipboard",
    '@angular/core': {
      root: ['ng', 'core'],
      commonjs: '@angular/core',
      commonjs2: '@angular/core',
      amd: '@angular/core'
    }
  },

  resolve: {
    extensions: ['', '.ts']
  },

  module: {
    loaders: [{
      test: /\.ts$/,
      loader: 'ts'
    }]
  }
};

var uglify = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    })
  ]
}

if (process.env.NODE_ENV && process.env.NODE_ENV.indexOf('prod') !== -1) {
  module.exports = webpackMerge(commonConfig, uglify);
} else {
  module.exports = commonConfig, uglify;
}