const assert = require('assert');

const u = require("@nkmjs/utils");

const { TIME } = require(`./lib/time`);
const signals = require(`./lib/signals`);
const POOL = require('./lib/pool');

function testFn(){ console.log(`nextTick fn called.`); }

assert.ok(!TIME.isBrowser);
TIME.WatchNextTick(testFn);

// Rudimentary SignalBroadcaster test

function signalFn( arg ){ console.log(`signalFn got : ${arg}`); }
function signalFn2( arg1, arg2 ){ console.log(`signalFn2 got : ${arg1} + ${arg2}`); }

let singleSignal = POOL.Rent(signals.SignalBroadcaster);
assert.ok(!u.isVoid(singleSignal));

singleSignal.Add(signalFn);
assert.ok(singleSignal._slots.length === 1);
singleSignal.Broadcast(`Test 1 (should read once)`);
singleSignal.Remove(signalFn);
assert.ok(singleSignal._slots.length === 0);
singleSignal.Broadcast(`Test 1 (should NOT read)`);
singleSignal.Add(signalFn);
singleSignal.Add(signalFn);
assert.ok(singleSignal._slots.length === 1);
singleSignal.Broadcast(`Test 2 (should read once)`);
singleSignal.RemoveAll();
assert.ok(singleSignal._slots.length === 0);
singleSignal.Broadcast(`Test 3 (should NOT read)`);

singleSignal.Add(signalFn);
singleSignal.Add(signalFn2);
assert.ok(singleSignal._slots.length === 1); //Subscriber being null.
singleSignal.Broadcast(`Test 3`, `Second Arg`);

singleSignal.Release();
singleSignal.Broadcast(`SHOULD NOT DISPLAY`);

let secondSingleSignal = POOL.Rent(signals.SignalBroadcaster);
assert.ok(singleSignal === secondSingleSignal);

// Rudimentary SignalBroadcaster box test

function signalBoxFnA( arg ){ console.log(`signalBoxFnA got : ${arg}`); }
function signalBoxFnB( arg1, arg2 ){ console.log(`signalBoxFnB got : ${arg1} + ${arg2}`); }

let EVT_TEST_A = Symbol('test-event-a');
let EVT_TEST_B = Symbol('test-event-b');

let sBox = POOL.Rent(signals.SignalBox);
assert.ok(!u.isVoid(sBox));

sBox.Add(EVT_TEST_A, signalBoxFnA);
sBox.Add(EVT_TEST_B, signalBoxFnB);
sBox.Broadcast(EVT_TEST_A, `A (once)`);
sBox.Broadcast(EVT_TEST_B, `B (once)`, `B2`);
