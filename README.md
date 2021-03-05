![preview](https://img.shields.io/badge/-alpha-3ec188.svg)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![doc_progress](https://img.shields.io/badge/dynamic/json?color=282725&label=doc&query=documentation_progress&url=https://github.com/Nebukam/nkmjs/raw/main/packages/nkmjs-core-dev/metadata.json)](https://nebukam.github.io/nkmjs/documentation/)
  
![NKMjs][logo]

## **NKMjs**

NKMjs is yet another JS library to build cross-plateform applications.  

· · ·
## **Simply put, NKMjs combines an application framework and its build system.**
### **It enables you to maintain a single source and package it as a Progressive Web App (PWA), browser extensions (Chromium-based browser & Firefox) & Electron app in one command line.**  
· · ·

## **INSTALL**

First, install [Node.js](https://nodejs.org/en/), then a package manager.  
While Node.js comes bundled with [npm](http://npmjs.com/) it is **strongly** recommended to use [Yarn](https://yarnpkg.com/), and **required when targeting Electron**.  

Open a command prompt in the folder where you want to quickstart a project; then initialize Yarn :
```javascript
npm install -g yarn // This installs Yarn on your machine.
yarn init // This will prompt Yarn wizard to initialize package.json
```
Next, install the two main packages of NKMjs :
```javascript
yarn add @nkmjs/core
yarn add @nkmjs/core-dev --dev
```
[@nkmjs/core](https://github.com/Nebukam/nkmjs/tree/main/packages/nkmjs-core) contains the actual app framework modules, while [@nkmjs/core-dev](https://github.com/Nebukam/nkmjs/tree/main/packages/nkmjs-core-dev) contains the build & automation tools.

Last but not least, bootstrap NKMjs and get coding !
```javascript
yarn run nkmjs bootstrap
```


## **INFOS**

NKMjs is **primarily oriented toward developing tools & self contained applications**. Once compiled, the app itself is constructed on the fly _inside the client_ (meaning no server-side rendering, no 'per-page' metadata etc).  
The application framework itself is plain javascript. When packaged for Electron, it isn't transformed (bundled); however for extensions & PWA, the code is bundled using [Browserify](http://browserify.org/), transpiled using [Babel](https://babeljs.io/) for broader compatibility & finally minified using [Terser](https://github.com/terser/terser) plus an additional bit of custom transforms. 


### · [@nkmjs/core](https://github.com/Nebukam/nkmjs/tree/main/packages/nkmjs-core)
### · [@nkmjs/core-dev](https://github.com/Nebukam/nkmjs/tree/main/packages/nkmjs-core-dev)  
### · [NKMjs Documentation](https://nebukam.github.io/nkmjs/documentation/)

· · ·


[logo]: https://github.com/Nebukam/nkmjs/raw/main/bin/nkmjs-monorepo-logo.png "nkmjs-logo"