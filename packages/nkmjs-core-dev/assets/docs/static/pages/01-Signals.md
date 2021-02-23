Signals are like events, only they're not. 
The concept is based on Robert's Penner Signals for ActionScript 3, or C++' Qt Slots.

To quote Robert Penner :

* A Signal is essentially a mini-dispatcher specific to one event, with its own array of listeners.
* A Signal gives an event a concrete membership in a class.
* Listeners subscribe to real objects, not to string-based channels.
* Event string constants are no longer needed.
* Signals are inspired by C# events and signals/slots in Qt.

Some of that logic is wrapped around inside the {@link common.SignalBox} to streamline Watching/Broadcasting, so the syntax leans toward something more familiar like the usual event system; but in essence, it's an OOP version of the regular JS' Event system.

<div class="tip warning" data-title="Attention !">
One major difference with the regular JavaScript' event system is that Signals don't have a bubble mechanic, and cannot be interrupted using methods such as `preventDefault`.
</div>

## In Practice

Say we have an 'ADDED' signal, broadcasted by a container to notify its listeners of an addition. You would normally have something ressembling the following :

<pre class="prettyprint" data-title="Event"><code>const event = new Event('added');

// Listen for the event.
container.addEventListener('added', function (e) { /* ... */ }, false);
// Dispatch the event.
container.dispatchEvent(event);
</code></pre>

Now with signals, assuming 'container' implements the right signals...

<pre class="prettyprint" data-title="Signal"><code>// Inside our 'container' object
const ADDED = POOL.Rent(Signal);

// Start watching the signal 
container.ADDED.Watch(function () { /* ... */ });
// Broadcast the signal.
container.ADDED.Broadcast();
</code></pre>

