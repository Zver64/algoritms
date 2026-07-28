// Technically this class code is correct, but typescript throws an error for no real reason.
// Because in the example below class there is an object with the same fucking method and
// typescript doesnt throw shit aobut it. Yet here in the class we have to explicitly define type
// of "this" entity..... Like WTF dude??
class A {
  a = 0;

  increment = function () {
    // here is the error....
    this.a++;
  };

  // here we explicitly type 'this'
  decrement = function (this: A) {
    // and the error is gone now.
    this.a++;
  };

  clear = () => {
    // we can create arrow function instead and this will fix the error. But it only fixes that because
    // of the nature of arrow funcitons. They do not have their own 'this'. This this is just a workaround.
    this.a++;
  };

  // we can also try to create a class method, but that would be object's protoype method. Another hack.
  // It is no suitable when we want to create object's direct method.
  print() {
    return this.a;
  }
}

const a = new A();
console.log(a);
a.increment();
console.log(a);

// the class abowe creates exactly the same fucking object like this below.
const b = {
  a: 0,
  // and we did not explicitly type 'this' here
  increment: function () {
    // yet here we do not have any errror....WTF....
    this.a++;
  },
};

console.log(b);
b.increment();
console.log(b);
