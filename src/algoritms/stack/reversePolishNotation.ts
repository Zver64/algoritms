import assert from 'assert';

type Operations = '+' | '-' | '*' | '/';

const operations: Record<Operations, (a: number, b: number) => number> = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

function performOperation(operation: Operations, a: string, b: string) {
  const res = operations[operation](Number(b), Number(a));
  console.log('test operation: ', operation, a, b, res);
  return (res > 0 ? Math.floor(res) : Math.ceil(res)).toString();
}

function isOperator(val: unknown): val is Operations {
  const operators: Operations[] = ['+', '-', '*', '/'];
  console.log('test val', val);
  return operators.includes(val as Operations);
}

function evalRPN(tokens: string[]): number {
  const stack: string[] = [tokens[0]];
  let i = 1;

  while (stack.length > 1 || i < tokens.length) {
    const nextVal = i < tokens.length ? tokens[i] : stack.pop();
    if(nextVal === undefined) {
      break;
    }
    if (isOperator(nextVal)) {
      stack.push(
        performOperation(
          nextVal,
          stack.pop() as string,
          stack.pop() as string,
        )
      );
    } else {
      stack.push(nextVal);
    }
    i++;
  }

  console.log('result: ', stack);

  return Number(stack.pop());
}


// second more elegant sollution


function refine(val: number): number {
  return val >= 0 ? Math.floor(val) : Math.ceil(val);
}

function evalRPN2(tokens: string[]): number {
  const stack: number[] = [];

  for (const val of tokens) {
    let a,b;
    switch(val) {
      case "+":
        [a, b] = [stack.pop() as number, stack.pop() as number];
        stack.push(b + a);
        break;
      case "-":
        [a, b] = [stack.pop() as number, stack.pop() as number];
        stack.push(b - a);
        break;
      case "*":
        [a, b] = [stack.pop() as number, stack.pop() as number];
        stack.push(b * a);
        break;
      case "/":
        [a, b] = [stack.pop() as number, stack.pop() as number];
        stack.push(refine(b / a));
        break;
      default:
        stack.push(Number(val));
    }
  }

  return stack.pop() as number;
}

assert.strictEqual(evalRPN(['2', '1', '+', '3', '*']), 9);
assert.strictEqual(evalRPN(['4', '13', '5', '/', '+']), 6);
assert.strictEqual(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]), 22);

assert.strictEqual(evalRPN2(['2', '1', '+', '3', '*']), 9);
assert.strictEqual(evalRPN2(['4', '13', '5', '/', '+']), 6);
assert.strictEqual(evalRPN2(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]), 22);
