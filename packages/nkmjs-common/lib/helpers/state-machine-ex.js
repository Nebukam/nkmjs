// State-machine that can be interrupted in its state changes
// .PrepareStateChange(newState) -> triggers STATE_CHANGING and return true/false if not interrupted
// .PreventStateChange();
// .CommitStateChange(); -> triggers STATE_CHANGED