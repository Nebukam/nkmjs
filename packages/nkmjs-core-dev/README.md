![preview](https://img.shields.io/badge/-alpha-3ec188.svg)
![version](https://img.shields.io/badge/dynamic/json?color=ed1e79&label=version&query=version&url=https://github.com/Nebukam/nkmjs/raw/main/packages/nkmjs-core-dev/package.json)
![in development](https://img.shields.io/badge/license-MIT-black.svg)
[![doc_progress](https://img.shields.io/badge/dynamic/json?color=282725&label=doc&query=documentation_progress&url=https://github.com/Nebukam/nkmjs/raw/main/packages/nkmjs-core-dev/metadata.json)](https://nebukam.github.io/nkmjs/documentation/)

![NKMjs][logo]

## **INSTALL**

First, install [Node.js](https://nodejs.org/en/), then a package manager. While Node.js comes bundled with [npm](http://npmjs.com/) it is **strongly** recommended to use [Yarn](https://yarnpkg.com/), and **required when targeting Electron**.  
Open a command prompt in the folder where you want to quickstart a project; then do :

```
yarn add @nkmjs/core
yarn add @nkmjs/core-dev --dev</code></pre>
```

## **QUICKSTART**

In order to initialize your project for NKMjs, use the bootstrap wizard :
```
npm run nkmjs bootstrap
```
  
  
You can now start your app (in electron) by doing :
```
npm run nkmjs start
```

After you do your own magic, you can then build your app using :
```
npm run nkmjs build
```
Note that if you want to distribute an Electron build, it is **mandatory** to use [Yarn](https://yarnpkg.com/) to manage your dependencies instead of npm.

## **MORE INFOS**
### · [@nkmjs/core](https://github.com/Nebukam/nkmjs/tree/main/packages/nkmjs-core)
### · [@nkmjs/core-dev](https://github.com/Nebukam/nkmjs/tree/main/packages/nkmjs-core-dev)  
### · [NKMjs Documentation](https://nebukam.github.io/nkmjs/documentation/)


[logo]: https://github.com/Nebukam/nkmjs/raw/main/packages/nkmjs-core-dev/bin/logo.png "nkmjs-logo"

