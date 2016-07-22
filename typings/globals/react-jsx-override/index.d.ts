
declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any; //HACK: is there a way to cleanly override/add this?
    }
}
