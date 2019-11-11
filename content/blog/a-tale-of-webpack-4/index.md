---
title: A tale of Webpack 4 and how to finally configure it in the right way. Updated.
image: './image.jpg'
date: "2015-05-28T22:40:32.169Z"
description: "Spoiler: there is no right way. #justwebpackthings"
---

 > This blogpost has been last updated 28.12.2018 with webpack v4.28.0.

 >__Update 23.06.2018:__ I have received a bunch of comments about what worked and what can be improved! Thank you for your feedback! I have tried to take every comment into consideration here! At a certain point I have also decided to create a webpack boilerplate project on github, were you can git pull the latest webapck.config! Thank you for your support! Link: https://github.com/marharyta/webpack-boilerplate

__Update:__ this article is now a part of a series of articles about Webpack and React.js set ups. Read the next part about configuring dev environment with React here: <https://medium.com/@riittagirl/how-to-develop-react-js-apps-fast-using-webpack-4-3d772db957e4>

Thanks for giving my tutorial so much feedback. I am proud to say that Webpack has twitted about it the other day and it was officially approved by a couple of contributors!

![TWITTER LINK](https://miro.medium.com/max/1000/1*LMP6qbC151q2eJ7efXurmA.jpeg)
![Twitter](https://miro.medium.com/max/1000/1*UVme7DsXop97cirV0TuaWw.jpeg)


There are a million tutorials online, so you probably have seen a thousand different ways to configure Webpack file. And all of them will be working examples. Why is it so? Webpack itself has been evolving really fast and a lot of loaders and plugins have to keep up. This is a major reason why the configuration files are so different: with a different version combination of the same tools things might work, or break.

Let me just say one thing, and this is my sincere opinion: a lot of people have been complaining about webpack and how cumbersome it is. This is true in many ways, although I have to say with my experience of working with gulp and grunt, you stumble upon the same type of errors there too, meaning that when you use npm modules, it’s inevitable that some versions would be incompatible.

Webpack 4 so far is the popular module bundler that has just undergone a massive update. There is a lot of new things it has to offer, such as zero configuration, reasonable defaults, performance improvement, optimisation tools out of the box.

If you are completely new to webpack, a great way to start would be to read the docs. Webpack has a pretty nice documentation with many parts explained, so I will go through them very briefly.

**Zero config:** webpack 4 does not require a configuration file, this is new for the version 4. Webpack kinda grows step by step, so there is no need to do a monstrous configuration from the start.

**Performance improvement:** webpack 4 is the fastest version of webpack so far.

**Reasonable defaults:** webpack 4 main concepts are entry, output, loaders, plugins. I will not cover these in details, although the difference between loaders and plugins is very vague. It all depends on how library author has implemented it.


## Core concepts

### Entry

This should be your _.js_ file. Now you will probably see a few configurations where people include _.scss_ or _.css_ file there. This is a major hack and can lead to a lot of unexpected errors. Also sometimes you see an entry with a few _.js_ files. While some solutions allow you to do so, I would say it usually adds more complexity and only do it when you really know why you are doing it.

### Output

This is your _build/_ or _dist/_ or _wateveryounameit/_ folder where your end js file will be hosted. This is your end result comprised of modules.

### Loaders

They mostly compile or transpile your code, like postcss-loader will go through different plugins. You will see it later.

### Plugins

Plugins play a vital role in outputting your code into files.

## Quickstart

Create a new directory and move into it:

```
mkdir webpack-4-tutorial
cd webpack-4-tutorial
```

Initialize a _package.json_:

```
npm init

```
or 
```
yarn init
```
We need to download webpack v4 as a module and webpack-cli to run it from your terminal.

```
npm install webpack webpack-cli --save-dev

```
or

```
yarn add webpack webpack-cli --dev
```

Make sure you have version 4 installed, if not, you can explicitly specify it in your _package.json_ file. Now open up _package.json_ and add a build script:

```
"scripts": {
  "dev": "webpack"
}
```

Trying to run it, you will most likely see a warning:

`WARNING in configuration
The ‘mode’ option has not been set, webpack will fallback to ‘production’ for this value. Set ‘mode’ option to ‘development’ or ‘production’ to enable defaults for each environment.
You can also set it to ‘none’ to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/`

## Webpack 4 modes

You need to edit your script to contain mode flag:

```
"scripts": {
  "dev": "webpack --mode **development**"
}
ERROR in Entry module not found: Error: Can’t resolve ‘./src’ in ‘~/webpack-4-quickstart’

```
This means webpack is looking for a folder _.src/_ with an _index.js_ file. This is a default behaviour for webpack 4 since it requires zero configuration.