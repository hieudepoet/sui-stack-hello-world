module hello_world::greeting;

use std::string;

public struct Greeting has key {
    id: UID,
    text: string::String,
}

public struct GreetingCreated has copy, drop {
    greeting_id: ID,
    text: string::String,
    creator: address,
}

public entry fun new(text: string::String, ctx: &mut TxContext) {
    let greeting_id = object::new(ctx);
    let id_copy = object::uid_to_inner(&greeting_id);

    let new_greeting = Greeting {
        id: greeting_id,
        text,
    };

    // Emit event
    sui::event::emit(GreetingCreated {
        greeting_id: id_copy,
        text: new_greeting.text,
        creator: ctx.sender(),
    });

    transfer::share_object(new_greeting);
}

public entry fun update_text(g: &mut Greeting, new_text: string::String) {
    g.text = new_text;
}
