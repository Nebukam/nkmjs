
## **BOOTSTRAP**

In order to initialize your project for NKMjs, use the bootstrap wizard :
<pre class="prettyprint" data-title="Command"><code>npm run nkmjs bootstrap</code></pre>

## **DEV COMMANDS**

Once your project has been bootstrapped, you can call build & test commands like so :
<pre class="prettyprint" data-title="Command"><code>npm run nkmjs command-name</code></pre>

A "command" runs a chain of tasks. There are a bunch of command/tasks list available by default :

| Command name | What it does |
|---	|---	|
| test | run 'task-test' |
| bootstrap | run 'task-bootstrap-project'. Useful only once per project, takes you through a quick setup wizard. |
| start | run 'task-start-electron' & 'task-cleanup'. Starts an electron process and load your app. |
| build |  |
| start-debug |  |
| build-www |  |
| build-pwa |  |
| build-ext |  |
| build-all |  |
| build-all-www |  |
| package-electron |  |
| fetch-styles |  |
| fetch-and-build-styles |  |
| post-install |  |

### **Arguments**

Note : to forward arguments to the scripts make sure to pipe them using a forward '--' :
<pre class="prettyprint" data-title="Command"><code>npm run nkmjs build-all-www -- -no-cleanup -invalidate-cache</code></pre>

| argument | What it does |
|---	|---	|
| --no-cleanup | Skip the clean-up step. Only useful if something goes really wrong and you want to have a look at the generated files & resources without having to build the app. By default, all tasks are wrapped up with a cleanup routine, which removes temp files & generated resources to keep your stuff clean.|
| --invalidate-cache	|Invalidate & delete existing cached library bundles.|
| --pack-only	|When building for electron, will only package the application file (doesn't generate an installer)|
| --verbose-locales-audit |Output a verbose (detailed) locale audit|

## **CUSTOM COMMANDS & MICRO-TASKS**

NKMjs build system rely on micro tasks. While tasks are ran chained (as opposed to parallel), any task completion can depend on any number of sub-task completion. This effectively gives you fine grained control over what's happening.