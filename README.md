![preview](https://img.shields.io/badge/-alpha-3ec188.svg)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

![NKMjs][logo]

## **NKMjs**

NKMjs is yet another JS library to build cross-plateform applications.  

· · ·
### **Simply put, NKMjs enables you to maintain a unique codebase and package it as a Progressive Web App (PWA), browser extensions (Chrome, Edge & Firefox) & Electron app in one command line.**  
· · ·

The application framework itself is plain ES6 javascript. When packaged for Electron it isn't transformed, but for extensions & PWA, the code is bundled using [Browserify](http://browserify.org/), transpiled using [Babel](https://babeljs.io/) for broader compatibility & finally minified using [Terser](https://github.com/terser/terser) plus an additional bit of custom transforms. 

The application library is wrapped under [NKMjs core](https://github.com/Nebukam/nkmjs/tree/main/packages/nkmjs-core), while all the building/packaging stack is wrapped under [NKMJs core-dev](https://github.com/Nebukam/nkmjs/tree/main/packages/nkmjs-core-dev), leaving you with a tidy package.json :

<pre class="prettyprint" data-title="Install nkmjs-core"><code>"dependencies": {
    "@nkmjs/core": "..."
  },
  "devDependencies": {
    "@nkmjs/core-dev": "...",
    "electron": "..."
  }
</code></pre>
· · ·
## · [NKMjs Documentation](https://nebukam.github.io/nkmjs/documentation/)

[logo]: https://github.com/Nebukam/nkmjs/raw/main/bin/nkmjs-monorepo-logo.png "nkmjs-logo"