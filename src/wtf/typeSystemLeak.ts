// A clear example of type unsafety in typescript.
function foo(bar: Array<string | number>) {
  bar.push('I am string');
}

const numArray: number[] = [1, 2, 3];

// typescript does not throw error that we cannot put this number array into
// foo function. Cause for typescript: string is a subset of string | number.
// and they say: it is by design. And they will not change that just for cases
// like this example.
foo(numArray);

console.log(numArray);
