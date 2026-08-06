// limits simultanieously executing promises
async function PromiseAllWithLimit(tasks: (() => Promise<unknown>)[], limit: number) {
  const pendingTasks = new Set();
  const results = [];

  for(const task of tasks) {
    if(pendingTasks.size === limit) {
      await Promise.race(pendingTasks);
    }

    const res = task().finally(() => pendingTasks.delete(res));
    pendingTasks.add(res);
    results.push(res);
  }


  return Promise.all(results);
}
