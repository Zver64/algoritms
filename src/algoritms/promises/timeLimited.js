function timeLimited(fn, t) {
  return function (...args) {
    const timeout = setTimeout(() => {
      throw new Error('Time Limit Exceeded');
    }, t);

    return fn(...args)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        console.log('finally');
        clearTimeout(timeout);
      });
  };
}

const asyncResolve = () =>
  new Promise((resolve) => setTimeout(() => resolve(42), 100));
const asyncReject = () =>
  new Promise((_, reject) => setTimeout(() => reject(43), 100));

timeLimited(asyncResolve, 200)()
  .then((res) => console.log('then: ', res))
  .catch((res) => console.log('catch: ', res));
timeLimited(asyncReject, 200)()
  .then((res) => console.log('then: ', res))
  .catch((res) => console.log('catch: ', res));