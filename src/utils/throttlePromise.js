export const throttlePromise = async (tasks, limit = 5) => {
  const results = [];
  const executing = [];

  for (const task of tasks) {
    const p = Promise.resolve().then(() => task());
    results.push(p);

    if (limit <= tasks.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      executing.length >= limit && (await Promise.race(executing));
    }
  }

  return Promise.all(results);
};
