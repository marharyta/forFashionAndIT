---
title: A tale of Webpack 4 and how to finally configure it in the right way. Updated.
image: "https://images.unsplash.com/photo-1550610939-abf1a399a1ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
date: "2015-05-28T22:40:32.169Z"
description: 'Spoiler: there is no right way. #justwebpackthings'
---

This blogpost has been last updated 28.12.2018 with webpack v4.28.0
Update 23.06.2018: I have received a bunch of comments about what worked and what can be improved! Thank you for your feedback! I have tried to take every comment into consideration here! At a certain point I have also decided to create a webpack boilerplate project on github, were you can git pull the latest webapck.config! Thank you for your support! Link: https://github.com/marharyta/webpack-boilerplate

Update: this article is now a part of a series of articles about Webpack and React.js set ups. Read the next part about configuring dev environment with React here: https://medium.com/@riittagirl/how-to-develop-react-js-apps-fast-using-webpack-4-3d772db957e4
Thanks for giving my tutorial so much feedback. I am proud to say that Webpack has twitted about it the other day and it was officially approved by a couple of contributors!

There are a million tutorials online, so you probably have seen a thousand different ways to configure Webpack file. And all of them will be working examples. Why is it so? Webpack itself has been evolving really fast and a lot of loaders and plugins have to keep up. This is a major reason why the configuration files are so different: with a different version combination of the same tools things might work, or break.

Let me just say one thing, and this is my sincere opinion: a lot of people have been complaining about webpack and how cumbersome it is. This is true in many ways, although I have to say with my experience of working with gulp and grunt, you stumble upon the same type of errors there too, meaning that when you use npm modules, it’s inevitable that some versions would be incompatible.

Webpack 4 so far is the popular module bundler that has just undergone a massive update. There is a lot of new things it has to offer, such as zero configuration, reasonable defaults, performance improvement, optimisation tools out of the box.

If you are completely new to webpack, a great way to start would be to read the docs. Webpack has a pretty nice documentation with many parts explained, so I will go through them very briefly.

Zero config: webpack 4 does not require a configuration file, this is new for the version 4. Webpack kinda grows step by step, so there is no need to do a monstrous configuration from the start.

Performance improvement: webpack 4 is the fastest version of webpack so far.

Reasonable defaults: webpack 4 main concepts are entry, output, loaders, plugins. I will not cover these in details, although the difference between loaders and plugins is very vague. It all depends on how library author has implemented it.


## Core concepts

### Entry

This should be your .js file. Now you will probably see a few configurations where people include .scss or .css file there. This is a major hack and can lead to a lot of unexpected errors. Also sometimes you see an entry with a few .js files. While some solutions allow you to do so, I would say it usually adds more complexity and only do it when you really know why you are doing it.

### Output

This is your build/ or dist/ or wateveryounameit/ folder where your end js file will be hosted. This is your end result comprised of modules.

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

Initialize a package.json :




The Big Oxmox advised her not to do so, because there were thousands of bad
Commas, wild Question Marks and devious Semikoli, but the Little Blind Text
didn’t listen. She packed her seven versalia, put her initial into the belt and
made herself on the way.

- This however showed weasel
- Well uncritical so misled
  - this is very interesting
- Goodness much until that fluid owl

When she reached the first hills of the **Italic Mountains**, she had a last
view back on the skyline of her hometown _Bookmarksgrove_, the headline of
[Alphabet Village](http://google.com) and the subline of her own road, the Line
Lane. Pityful a rethoric question ran over her cheek, then she continued her
way. On her way she met a copy.

### Overlaid the jeepers uselessly much excluding

But nothing the copy said could convince her and so it didn’t take long until a
few insidious Copy Writers ambushed her, made her drunk with
[Longe and Parole](http://google.com) and dragged her into their agency, where
they abused her for their projects again and again. And if she hasn’t been
rewritten, then they are still using her.

> Far far away, behind the word mountains, far from the countries Vokalia and
> Consonantia, there live the blind texts. Separated they live in Bookmarksgrove
> right at the coast of the Semantics, a large language ocean.

It is a paradisematic country, in which roasted parts of sentences fly into your
mouth. Even the all-powerful Pointing has no control about the blind texts it is
an almost unorthographic life One day however a small line of blind text by the
name of Lorem Ipsum decided to leave for the far World of Grammar.

### According a funnily until pre-set or arrogant well cheerful

The Big Oxmox advised her not to do so, because there were thousands of bad
Commas, wild Question Marks and devious Semikoli, but the Little Blind Text
didn’t listen. She packed her seven versalia, put her initial into the belt and
made herself on the way.

1.  So baboon this
2.  Mounted militant weasel gregariously admonishingly straightly hey
3.  Dear foresaw hungry and much some overhung
4.  Rash opossum less because less some amid besides yikes jeepers frenetic
    impassive fruitlessly shut

When she reached the first hills of the Italic Mountains, she had a last view
back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet
Village and the subline of her own road, the Line Lane. Pityful a rethoric
question ran over her cheek, then she continued her way. On her way she met a
copy.

> The copy warned the Little Blind Text, that where it came from it would have
> been rewritten a thousand times and everything that was left from its origin
> would be the word "and" and the Little Blind Text should turn around and
> return to its own, safe country.

But nothing the copy said could convince her and so it didn’t take long until a
few insidious Copy Writers ambushed her, made her drunk with Longe and Parole
and dragged her into their agency, where they abused her for their projects
again and again. And if she hasn’t been rewritten, then they are still using
her. Far far away, behind the word mountains, far from the countries Vokalia and
Consonantia, there live the blind texts.

#### Silent delightfully including because before one up barring chameleon

Separated they live in Bookmarksgrove right at the coast of the Semantics, a
large language ocean. A small river named Duden flows by their place and
supplies it with the necessary regelialia. It is a paradisematic country, in
which roasted parts of sentences fly into your mouth.

Even the all-powerful Pointing has no control about the blind texts it is an
almost unorthographic life One day however a small line of blind text by the
name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox
advised her not to do so, because there were thousands of bad Commas, wild
Question Marks and devious Semikoli, but the Little Blind Text didn’t listen.

##### Wherever far wow thus a squirrel raccoon jeez jaguar this from along

She packed her seven versalia, put her initial into the belt and made herself on
the way. When she reached the first hills of the Italic Mountains, she had a
last view back on the skyline of her hometown Bookmarksgrove, the headline of
Alphabet Village and the subline of her own road, the Line Lane. Pityful a
rethoric question ran over her cheek, then she continued her way. On her way she
met a copy.

###### Slapped cozy a that lightheartedly and far

The copy warned the Little Blind Text, that where it came from it would have
been rewritten a thousand times and everything that was left from its origin
would be the word "and" and the Little Blind Text should turn around and return
to its own, safe country. But nothing the copy said could convince her and so it
didn’t take long until a few insidious Copy Writers ambushed her, made her drunk
with Longe and Parole and dragged her into their agency, where they abused her
for their projects again and again.
