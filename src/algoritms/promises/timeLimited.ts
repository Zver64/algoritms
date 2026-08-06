function timeLimited<Args extends unknown[], TResult>(
  fn: (args: Args) => Promise<TResult>,
  t: number,
): (...args: Args) => Promise<TResult> {
  return function (...args: Args): Promise<TResult> {
    let timeout: ReturnType<typeof setTimeout>;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeout = setTimeout(() => {
        reject(new Error('Timeout exeedeed'));
      }, t);
    });

    return Promise.race([timeoutPromise, fn(args)]).finally(() => {
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
