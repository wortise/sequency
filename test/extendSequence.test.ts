import {extendSequence, sequenceOf, Sequence} from "../src/sequency";

class GreetAll {
    greetAll(this: Sequence<string>): string {
        const names = this.joinToString({ separator: ", " });
        return "Hello " + names + " !";
    }
}

declare module "../src/sequency" {
    export default interface Sequence<T> extends GreetAll {
    }
}

describe("extendSequence", () => {
    it("should extend Sequence implementation prototype with provided mixin", () => {
        extendSequence(GreetAll);
        const names = sequenceOf("John", "Bob", "Steve");
        const greetings = names.greetAll();

        expect(greetings).toBe("Hello John, Bob, Steve !");
    });
});
