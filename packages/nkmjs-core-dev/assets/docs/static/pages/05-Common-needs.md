This page list the things you usually may want/need to do when developping an app.  
In order to use any of the NKMjs functionality without importing a specific module, make sure to import @nkmjs/core at the top of the js file.  

This page assumes the following line is present in your doc :
<pre class="prettyprint" data-title="Requires"><code>const nkm = require(`@nkmjs/core`);</code></pre>


### Summary
- Popups
    - Popup : Message
    - Popup : User Input
- Overlay & Drawers
    - Simple drawer

## Popups

Popup are created using the dialog object found in @nkmjs/dialog package.  
While you can craft a Dialog object yourself if you have _very specific needs_, it's usually easier and more straightforward to simply use ```dialog.Push```.
<pre class="prettyprint" data-title="Requires"><code>const dialog = nkm.dialog;
const ui = nkm.ui;

dialog.Push( params );</code></pre>


### Popup : Message

The most simple dialog look like this : 

<pre class="prettyprint" data-title="Requires"><code>nkm.dialog.Push({
    title: `Hello`,
    message: `This is dialog.`,
    actions: [
        { label: `Ok` }
    ]
});</code></pre>

A more visually customized version :

<pre class="prettyprint" data-title="Requires"><code>nkm.dialog.Push({
    title: `Hello`,
    message: `This is a warning dialog.`,
    actions: [
        { label: `Ok` }
    ],
    icon: `warning`,
    flavor: nkm.common.FLAGS.WARNING,
    variant: ui.FLAGS.FRAME
});</code></pre>

The ```actions``` array is forwarded to a {@link ui.core.WidgetBar|WidgetBar}, so you can use whatever properties you want in there. Each item will be passed in order to {@link ui.core.WidgetBar#CreateHandle|CreateHandle}

### Popup : User Input
