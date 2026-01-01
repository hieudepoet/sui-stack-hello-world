/*
/// Module: counter
module counter::counter;
*/

// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions

module counter::counter;

public struct Counter has key {
    id: UID,
    value: u64,
}

public entry fun new(ctx: &mut TxContext) {
    let counter = Counter {
        id: object::new(ctx),
        value: 0,
    };
    transfer::share_object(counter);
}

public entry fun increment(counter: &mut Counter) {
    counter.value = counter.value + 1;
}
