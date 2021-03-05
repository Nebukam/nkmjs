![preview](https://img.shields.io/badge/-alpha-3ec188.svg)
![version](https://img.shields.io/badge/dynamic/json?color=ed1e79&label=version&query=version&url=https://github.com/Nebukam/nkmjs/raw/main/packages/nkmjs-core-dev/package.json)
![in development](https://img.shields.io/badge/license-MIT-black.svg)
![doc_progress](https://img.shields.io/badge/dynamic/json?color=282725&label=documentation%20coverage&query=documentation_progress&url=https://github.com/Nebukam/nkmjs/raw/main/packages/nkmjs-core-dev/main/metadata.json)

![NKMjs][logo]

## **INSTALL**

First, install [Node.js](https://nodejs.org/en/), then [Yarn](https://yarnpkg.com/). _While Node.js ships with NPM, Yarn is mandatory for NKMjs_  
Open a command prompt in the folder where you want to quickstart a project; then do :


<pre class="prettyprint" data-title="Install nkmjs using npm"><code>npm install @nkmjs/core
npm install @nkmjs/core-dev --save-dev</code></pre>
or using Yarn
<pre class="prettyprint" data-title="Install nkmjs using npm"><code>yarn add @nkmjs/core
yarn add @nkmjs/core-dev --dev</code></pre>


## **QUICKSTART**

In order to initialize your project for NKMjs, use the bootstrap wizard :
<pre class="prettyprint" data-title="Bootstraping"><code>npm run nkmjs bootstrap</code></pre>
  
  
You can now start your app (in electron) by doing :
<pre class="prettyprint" data-title="Launch electron app"><code>npm run nkmjs start</code></pre>

After you do your own magic, you can then build your app using :
<pre class="prettyprint" data-title="Build app"><code>npm run nkmjs build</code></pre>
Note that if you want to distribute an Electron build, it is **mandatory** to use [Yarn](https://yarnpkg.com/) to manage your dependencies instead of npm.

## **MORE INFOS**
### · [@nkmjs/core](https://github.com/Nebukam/nkmjs/tree/main/packages/nkmjs-core)
### · [@nkmjs/core-dev](https://github.com/Nebukam/nkmjs/tree/main/packages/nkmjs-core-dev)  
### · [NKMjs Documentation](https://nebukam.github.io/nkmjs/documentation/)


[logo]: https://github.com/Nebukam/nkmjs/raw/main/packages/nkmjs-core-dev/bin/logo.png "nkmjs-logo"

