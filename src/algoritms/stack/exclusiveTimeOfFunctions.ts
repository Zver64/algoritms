import assert from "assert";

function exclusiveTime(n: number, logs: string[]): number[] {
  const stack: number[] = [];
  const reg = /(\d+):(\w+):(\d+)/;
  const res: number[] = new Array(n).fill(0);
  let lastTime = 0;

  for (const log of logs) {
    const regRes = reg.exec(log);
    if(!regRes) {
      throw new Error('broken logs');
    }
    const [_, i, tag, t] = regRes;
    const idx = Number(i);
    const time = Number(t);

    if(tag === 'start') {
      if(stack.length) {
        res[stack[stack.length - 1]] += time - lastTime;
      }
      stack.push(idx);
      lastTime = time;
    } else {
      res[Number(stack.pop())] += time + 1 - lastTime;
      lastTime = time + 1;
    } 
  }
  return res;
}


assert.deepEqual(exclusiveTime(2, ["0:start:0","1:start:2","1:end:5","0:end:6"]), [3,4]);
assert.deepEqual(exclusiveTime(2, ["0:start:0","0:start:2","0:end:5","0:start:6","0:end:6","0:end:7"]), [8]);
assert.deepEqual(exclusiveTime(2, ["0:start:0","0:start:2","0:end:5","1:start:6","1:end:6","0:end:7"]), [7,1]);
