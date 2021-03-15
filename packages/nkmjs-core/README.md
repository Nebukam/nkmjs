![preview](https://img.shields.io/badge/-alpha-3ec188.svg)
![version](https://img.shields.io/badge/dynamic/json?color=ed1e79&label=version&query=version&url=https://github.com/Nebukam/nkmjs/raw/main/packages/nkmjs-core/package.json)
![in development](https://img.shields.io/badge/license-MIT-black.svg)
[![doc_progress](https://img.shields.io/badge/dynamic/json?color=282725&label=doc&query=documentation_progress&url=https://github.com/Nebukam/nkmjs/raw/main/packages/nkmjs-core-dev/metadata.json)](https://nebukam.github.io/nkmjs/documentation/)

![NKMjs][logo]

## **INSTALL & QUICKSTART**
Check out the [NKMjs root](https://github.com/Nebukam/nkmjs/) readme to get started.

## **FEATURES & MODULES**
NKMjs is a javascript (CommonJS) framework aimed at making web-based application & tool developement quick & easy. It supports a number of features out-of-the-box and is painless to extend.  
_While not written in typescript, NKMjs is strongly object-oriented (if this sounds counter-intuitive, it's because it is.)_

* ### **Component-based UI**  
    [@nkmjs/ui-core]() is a fully fledged component based UI system. Extend abstract & robust components to easily add your own functionalities.

* ### **Complex application workspace**  
    [@nkmjs/ui-workspace]() offers abstract workspace functionalities to manage editors, multiple documents etc.

* ### **Actions & History with Undo/Redo**  
    [@nkmjs/actions]() helps managing actions, commands, history (undo/redo), seperated from their UI implementation.

* ### **Localisation**
    [@nkmjs/localisation]() handles localisation at a very low level in the library, making it a breeze to internationalize your app.

* ### **Unified & extensible storage interactions**  
    [@nkmjs/io-core]() Store data easily no matter the platform you're building on. _Web & PWA uses localStorage, extensions uses storageArea, electron uses the client's file system._

* ### **Easy metrics**  
    [@nkmjs/metrics]() offers a unified facade for your metrics needs, implemented at a low level inside the NKMjs library. _only supports google analytics out-of-the-box at the moment_


[logo]: https://github.com/Nebukam/nkmjs/raw/main/packages/nkmjs-core/bin/logo.png "nkmjs-logo"