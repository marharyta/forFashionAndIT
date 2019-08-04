---
title: How I solved and debugged my Webpack issue through trial, error, and a little outside help.
date: "2015-05-06T23:46:37.121Z"
image: "https://images.unsplash.com/photo-1550610939-abf1a399a1ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
description: This is a custom description for SEO and Open Graph purposes, rather than the default generated excerpt. Simply add a description field to the frontmatter.
---


See the original at: https://www.instagram.com/p/BdCxrMcn-k5/?taken-by=riittagirl
I would say that this was quite a journey. I knew that Webpack was not easy to configure: there are many parts with many options, there’s npm hell, and they change with new releases. No wonder it can easily become a troublesome task to debug when something does not go as you expected (that is, not as it is in the docs).

Trying to debug
My debugging journey started with the following setup:

webpack.config.js

// webpack v4.6.0
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    open: true
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'eslint-loader',
            options: { 
              formatter: require('eslint/lib/formatters/stylish') 
            }
           }
         ]
       }
     ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash()
  ]
};
package.json

{
  "name": "post",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack --mode production",
    "dev": "webpack-dev-server"
   },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.4",
    "babel-preset-env": "^1.6.1",
    "babel-preset-react": "^6.24.1",
    "babel-runtime": "^6.26.0",
    "clean-webpack-plugin": "^0.1.19",
    "eslint": "^4.19.1",
    "eslint-config-prettier": "^2.9.0",
    "eslint-loader": "^2.0.0",
    "eslint-plugin-prettier": "^2.6.0",
    "eslint-plugin-react": "^7.7.0",
    "html-webpack-plugin": "^3.2.0",
    "prettier": "^1.12.1",
    "react": "^16.3.2",
    "react-dom": "^16.3.2",
    "webpack": "^4.6.0",
    "webpack-cli": "^2.0.13",
    "webpack-dev-server": "^3.1.3",
    "webpack-md5-hash": "0.0.6"
  }
}
.babelrc

{
  "presets": ["env", "react"]
}
.eslintrc.js

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['warn', 'single'],
    semi: ['error', 'always'],
    'no-unused-vars': [
      'warn',
      { vars: 'all', args: 'none', ignoreRestSiblings: false }
    ],
    'prettier/prettier': 'error'
   }
};
prettier.config.js

// .prettierrc.js
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  bracketSpacing: true
};
And in the src/ folder:

index.html

<html>
 <head></head>
 <body>
    <div id="app"></div>
    <script src="<%= htmlWebpackPlugin.files.chunks.main.entry %>"></script>
 </body>
</html>
index.js

import React from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
class App extends React.Component {
  render() {
    return (
      <div>
        <Hello hello={'Hello, world! And the people of the world!'} />
     </div>
    );
  }
}
render(<App />, document.getElementById('app'));
Hello.js

import React from 'react';
import PropTypes from 'prop-types';
class Hello extends React.Component {
  render() {
    return <div>{this.props.hello}</div>;
  }
}
Hello.propTypes = {
  hello: PropTypes.string
};
export default Hello;
This was the overall project structure:


So, what was the problem?
As you can see, I set up the environment, the ESLinting, and so on. I created everything so that I could start coding and add my new components to my shiny new component library.

But what if I got an error? Let’s go screw something up.


If we try to backtrace the origin of the error from our Google Chrome browser console, this will be very difficult for us. We would stumble upon something like this:



The source maps are not configured!

I want it to point to a file Hello.js and not to a bundled file, kinda like this guy did here.

This is probably a tiny thingy
Or so I thought. So I tried to set up the source maps as described in the docs by adding devtool.

When webpack bundles your source code, it can become difficult to track down errors and warnings to their original location. For example, if you bundle three source files (a.js, b.js, and c.js) into one bundle (bundle.js) and one of the source files contains an error, the stack trace will simply point to bundle.js. This isn't always helpful as you probably want to know exactly which source file the error came from.
In order to make it easier to track down errors and warnings, JavaScript offers source maps, which maps your compiled code back to your original source code. If an error originates from b.js, the source map will tell you exactly that. (Source)
So I naively assumed this would work in my webpack.config.js:

...
module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    open: true
  },
  ...
and package.json

...
"scripts": {
  "build": "webpack --mode production",
  "dev": "webpack-dev-server --mode development"
}
...
You have to add a development flag when doing it, otherwise it won’t work as the docs say. Yet, even with the suggested value, the source map did not act as I wanted it to.


If you read this guide from SurviveJS, which you should, you will see.

After I tried every option from it, I resorted to GitHub issue hunting.

GitHub issue hunting
Trying all the suggestions in GitHub issues did not help me.

At some point I thought something was wrong with webpack-dev-server. And it turned out that the webpack-dev-server has been in maintenance mode for a few months already.


I discovered that after I stumbled upon this issue where they recommend to use webpack-serve instead of webpack-dev-server.

Honestly, that was the first time I had heard about an alternative called webpack-serve. The docs did not look promising, either. But I still decided to give it a shot.

npm install webpack-serve --save-dev
I created serve.config.js

const serve = require('webpack-serve');
const config = require('./webpack.config.js');
serve({ config });
I replaced webpack-dev-server with webpack serve in my package.json.

But trying webpack-serve didn’t solve it either.

So at this point I felt like I had used every suggestion I could find on GitHub:

Webpack 4 — Sourcemaps : this issue suggests that devtool: 'source-map' should work out of the box, but this was not the case for me
how to make webpack sourcemap to original files : adding devtoolModuleFilenameTemplate: info =>'file://' + path.resolve(info.absoluteResourcePath).replace(/\\/g, '/') to my output config did not help much. But instead of client.js, it showed me index.js.
https://github.com/webpack/webpack/issues/6400 : this one is not an accurate description of my issue, so trying the methods here did not seem to help me
I tried to use webpack.SourceMapDevToolPlugin but it didn’t work with my setup, even when I deleted devtools or set them to false
I did not use the UglifyJS plugin here, so setting up options for it was not a solution
I know that webpack-dev-server is in maintenance now, so I tried webpack-serve, but it seemed like source maps do not work with it either
I tried the source-map-support package as well, but no luck there. I have a similar situation as seen here.
The Holy StackOverflow
It took me forever to configure source maps, so I created an issue on StackOverflow.

Debugging webpack config is usually a cumbersome task: the best way to go about it is to create a config from a scratch. If something from the documentation does not work as expected, it might be a good idea to try to find a similar issue on a branch, or create your own issue. I thought so, anyway.

The first guy who answered my issue was really trying to help. He shared his own working config. Even helped me by creating a pull request.

The only problem here: why does his setup work? I mean, this is probably not magic, and there is some module incompatibility there. Sadly, I could not understand why my setup was not working:


The thing is that he did it with the best intentions by restructuring the project his way.

This meant that I would have some more setup in the project and would have to change quite a few things. That might have been ok if I was doing a test setup, but I decided to do the gradual changes to the files to see where it was breaking.

Dissecting the issue
So let’s take a look at the differences between his Webpack and package.json and mine. Just for the record, I used a different repo in the question, so here is my link to the repo and my setup.

// webpack v4.6.0
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const stylish = require('eslint/lib/formatters/stylish');
const webpack = require('webpack');
module.exports = {
  entry: { main: './src/index.js' },
  output: {
   devtoolModuleFilenameTemplate: info => 'file://' + path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
   path: path.resolve(__dirname, 'dist'),
   filename: '[name].[hash].js'
  },
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          formatter: stylish
         }
       }
     ]
   },
   plugins: [
    // new webpack.SourceMapDevToolPlugin({
    //   filename: '[file].map',
    //   moduleFilenameTemplate: undefined,
    //   fallbackModuleFilenameTemplate: undefined,
    //   append: null,
    //   module: true,
    //   columns: true,
    //   lineToLine: false,
    //   noSources: false,
    //   namespace: ''
    // }),
    new CleanWebpackPlugin('dist', {}),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash(),
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
package.json

{
"name": "post",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
  "storybook": "start-storybook -p 9001 -c .storybook",
  "dev": "webpack-dev-server --mode development --open",
  "build": "webpack --mode production"
},
"author": "",
"license": "ISC",
"devDependencies": {
  "@storybook/addon-actions": "^3.4.3",
  "@storybook/react": "v4.0.0-alpha.4",
  "babel-cli": "^6.26.0",
  "babel-core": "^6.26.0",
  "babel-loader": "^7.1.4",
  "babel-preset-env": "^1.6.1",
  "babel-preset-react": "^6.24.1",
  "babel-runtime": "^6.26.0",
  "clean-webpack-plugin": "^0.1.19",
  "eslint": "^4.19.1",
  "eslint-config-prettier": "^2.9.0",
  "eslint-loader": "^2.0.0",
  "eslint-plugin-prettier": "^2.6.0",
  "eslint-plugin-react": "^7.7.0",
  "html-webpack-plugin": "^3.2.0",
  "prettier": "^1.12.1",
  "react": "^16.3.2",
  "react-dom": "^16.3.2",
  "webpack": "v4.6.0",
  "webpack-cli": "^2.0.13",
  "webpack-dev-server": "v3.1.3",
  "webpack-md5-hash": "0.0.6",
  "webpack-serve": "^0.3.1"
},
"dependencies": {
  "source-map-support": "^0.5.5"
}
}
I left them intact on purpose so that you can see my debugging attempts. Everything worked except for source maps. Below, I will share what he changed in my config — but it is of course better to check the full pull request here.

 // webpack v4.6.0
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 // deleting this module from the config
-const WebpackMd5Hash = require('webpack-md5-hash');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const stylish = require('eslint/lib/formatters/stylish');
 const webpack = require('webpack');
 
 module.exports = {
  // adding the mode setting here instead of a flag
+  mode: 'development',
   entry: { main: './src/index.js' },
   output: {
  // deleting the path and the template from the output
-    devtoolModuleFilenameTemplate: info =>
-      'file://' + path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
-    path: path.resolve(__dirname, 'dist'),
     filename: '[name].[hash].js'
   },
  // adding resolve option here
+  resolve: {
+    extensions: ['.js', '.jsx']
+  },
   //changing the devtool option
   devtool: 'eval-cheap-module-source-map',
  // changing the devServer settings
   devServer: {
-    contentBase: './dist',
-    hot: true
+    hot: true,
+    open: true
   },
   module: {
     rules: [
    // putting my two checks into one (later he asked me in the chat to delete eslint option completely)
       {
-        test: /\.js$/,
-        exclude: /node_modules/,
-        loader: 'babel-loader'
-      },
-      {
-        test: /\.js$/,
+        test: /\.jsx?$/,
         exclude: /node_modules/,
-        loader: 'eslint-loader',
-        options: {
-          formatter: stylish
-        }
+        use: [
+          { loader: 'babel-loader' },
+          { loader: 'eslint-loader', options: { formatter: stylish } }
+        ]
       }
     ]
   },
   plugins: [
    //cleaned some options
-    new CleanWebpackPlugin('dist', {}),
+    new CleanWebpackPlugin('dist'),
    //deleted some settings from the HTMLWebpackPlugin
     new HtmlWebpackPlugin({
-      inject: false,
-      hash: true,
-      template: './src/index.html',
-      filename: 'index.html'
+      template: './src/index.html'
     }),
  //completely removed the hashing plugin and added a hot module replacement one
-    new WebpackMd5Hash(),
-    new webpack.NamedModulesPlugin(),
+    new webpack.HotModuleReplacementPlugin()
   ]
 };
package.json

"main": "index.js",
   "scripts": {
     "storybook": "start-storybook -p 9001 -c .storybook",
  //added different flags for webpack-dev-server
-    "dev": "webpack-dev-server --mode development --open",
+    "dev": "webpack-dev-server --config ./webpack.config.js",
     "build": "webpack --mode production"
   },
   "author": "",
@@ -31,11 +31,6 @@
     "react-dom": "^16.3.2",
     "webpack": "v4.6.0",
     "webpack-cli": "^2.0.13",
-    "webpack-dev-server": "v3.1.3",
-    "webpack-md5-hash": "0.0.6",
-    "webpack-serve": "^0.3.1"
-  },
-  "dependencies": {
//moved dev server to dependencies

-    "source-map-support": "^0.5.5"
+    "webpack-dev-server": "v3.1.3"
   }
 }
As you can see, he deleted a bunch of modules and added mode inside of the config. And taking a look at the pull request, you can see that he also added some specific react-oriented HMR.

This helped the source maps work by sacrificing a lot of plugins, but there was no concrete explanation for why he did what he did. As a person who reads the docs, this was not very satisfying for me.

Later, I took my initial webpack.connfig.js and started to add the changes step by step too see when the source maps finally started to work.

Change 1:

-    new CleanWebpackPlugin('dist', {}),
+    new CleanWebpackPlugin('dist'),
Change 2:

I added webpack-dev-server to dependencies, not devDependencies:

...
},
"dependencies": {
  "webpack-dev-server": "^3.1.3"
}
}
...
Change 3:

Next I removed some devServer settings:

devServer: {
-    contentBase: './dist',
+    hot: true,
+    open: true
   },
Change 4:

Let’s remove stylish:

...
},
devtool: 'inline-source-map',
  devServer: {
    hot: true,
    open: true
  },
...
use: [
  { loader: 'babel-loader' },
  {
    loader: 'eslint-loader'
  }
]
....
Change 5:

Let’s try to remove the WebpackMd5Hash hashing plugin now:

...
module.exports = {
mode: 'development',
entry: { main: './src/index.js' },
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].js'
  },
devtool: 'inline-source-map',
...
plugins: [
  new CleanWebpackPlugin('dist'),
  new HtmlWebpackPlugin({
    inject: false,
    hash: true,
    template: './src/index.html',
    filename: 'index.html'
  })
-    new WebpackMd5Hash(),
 ]
};
Change 6:

Now let’s try to remove some settings from HtmlWebpackPlugin:

...
plugins: [
  new CleanWebpackPlugin('dist'),
  new HtmlWebpackPlugin({
    template: './src/index.html'
  })
]};
...
Change 7:

As we can see in his code, he added some resolve options here. I personally do not understand why we need them here. And I couldn’t find the info in the docs, either.

...
resolve: {
  extensions: ['.js', '.jsx']
},
module: {
...
Change 8:

Deleting output path:

...
entry: { main: './src/index.js' },
output: {
  filename: '[name].js'
},
devtool: 'inline-source-map',
...
Change 9:

Adding the hot module replacement plugin:

...
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
...
plugins: [
  new CleanWebpackPlugin('dist'),
  new HtmlWebpackPlugin({
    template: './src/index.html'
  }),
  new webpack.HotModuleReplacementPlugin()
]
};
...
Change 10:

Adding — config to package.json:

-    "dev": "webpack-dev-server --mode development --open",
+    "dev": "webpack-dev-server --config ./webpack.config.js",
Let’s make something clear: at this point I had almost re-written the config.

This is a massive issue, since we cannot just rewrite it every time something is not working!

Create-react-app in the best source to learn about webpack
As a last resort, I went to check how create-react-app implements the source mapping. That was the right decision after all. This is the config of webpack dev version.

If we check how devtool is implemented there, we will see:

// You may want ‘eval’ instead if you prefer to see the compiled output in DevTools.
// See the discussion in https://github.com/facebook/create-react-app/issues/343.
devtool: ‘cheap-module-source-map’
So this issue pointed me to another issue, found here.

// webpack v4
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
mode: "development",
entry: { main: './src/index.js' },
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].[hash].js'
},
devtool: 'cheap-module-source-map',
devServer: {
  contentBase: './dist',
  hot: true,
  open: true
},
module: {
