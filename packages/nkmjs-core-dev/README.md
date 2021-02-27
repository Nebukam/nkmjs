![preview](https://img.shields.io/badge/-alpha-3ec188.svg)
![version](https://img.shields.io/badge/dynamic/json?color=ed1e79&label=version&query=version&url=https://github.com/Nebukam/nkmjs/raw/main/packages/nkmjs-core-dev/package.json)
![in development](https://img.shields.io/badge/license-MIT-black.svg)
![doc_progress](https://img.shields.io/badge/dynamic/json?color=282725&label=documentation%20coverage&query=documentation_progress&url=https://github.com/Nebukam/nkmjs/raw/main/packages/nkmjs-core-dev/main/metadata.json)

![NKMjs][logo]

## **INSTALL & QUICKSTART**

First, install [Node.js](https://nodejs.org/en/), then [Yarn](https://yarnpkg.com/). _While Node.js ships with NPM, Yarn is mandatory for NKMjs_  
Open a command prompt in the folder where you want to quickstart a project; then do :


<pre class="prettyprint" data-title="Install nkmjs-core"><code>npm install @nkmjs/core</code></pre>
<pre class="prettyprint" data-title="Install nkmjs-core-dev"><code>npm install @nkmjs/core-dev --save-dev</code></pre>

If no config exists for nkmjs, the wizard will quickly take you through some basic configuration.
You can now start your app (in electron) by doing :

<pre class="prettyprint" data-title="Launch nkmjs-core"><code>npm run nkmjs-start</code></pre>

After you do your own magic, you can then build your app using

<pre class="prettyprint" data-title="Build nkmjs-core app"><code>npm run nkmjs-build</code></pre>

---
Note : If you want to distribute an Electron build, it is **mandatory** to use [Yarn](https://yarnpkg.com/) to manage your dependencies instead of npm.

[logo]: https://github.com/Nebukam/nkmjs/raw/main/packages/nkmjs-core-dev/bin/logo.png "nkmjs-logo"