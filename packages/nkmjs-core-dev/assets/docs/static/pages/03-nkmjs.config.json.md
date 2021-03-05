
Minimal nkmjs.config.json file looks like :

<pre class="prettyprint" data-title="Minimal nkmjs.config.json"><code>{
    "name": "my-app",
    "longName": "My App : Verbose Name",
    "shortName": "My App",
    "description": "My app description",
    "homepage": "https://my-app.com",
    "builds": [
        { "platform": "pwa" }, // PWA build
    ]
}
</code></pre>

While a more complex, fully-fledged config will look like _(any required yet unspecified config file will filled with a working placeholder at build time)_:

<pre class="prettyprint" data-title="Complete nkmjs.config.json"><code>{
    "name": "my-app",
    "longName": "My App : Verbose Name",
    "shortName": "My App",
    "description": "My app description",
    "lang": "en",
    "homepage": "https://my-app.com",
    "app": { // PWA-specific configuration
        "display": "standalone",
        "orientation": "portrait",
        "colorTheme": "#1e1e1e",
        "theme": "default"
    },
    "metrics":{
        "id":"G-XXXXXXXXXX", // Google analytics ID (only metrics supported at the time of writing)
        "script":"assets/metrics.html"
    },
    "extension": {
        "popup": {
            "width": 800,
            "height": 600
        },
        "display": "standalone",
        "permissions": [
            "storage"
        ],
        "hostPermissions": [
            "%homepage%"
        ]
    },
    "dirs": {
        "app": "app",
        "styleSource": "scss",
        "style": "style",
        "assets": "assets",
        "icons": "%dirs.assets%/icons",
        "builds": "builds",
        "locales": "locales",
        "offline": [ 
            "%dirs.style%" 
        ]
    },
    "builds": [
        { "platform": "www" }, // Web build
        { "platform": "pwa" }, // Progressive web app build
        { "platform": "chrome" }, // Chrome extension build
        { "platform": "firefox" }, // Firefox extension build
        { "platform": "edge" }, // Edge extension build
        { "platform": "windows", "arch": "x64" } // Electron build
    ]
}
</code></pre>