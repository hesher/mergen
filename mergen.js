function race(promises) {
  return new Promise(resolve =>
    promises.forEach((p, index) => {
      p.then(value => {
        resolve({index, value});
      });
    })
  );
}

exports.mergen = async function* mergen(...gens) {
  const promises = gens.map((gen, index) =>
    gen.next().then(p => ({...p, gen}))
  );

  while (promises.length > 0) {
    yield race(promises).then(({index, value: {value, done, gen}}) => {
      promises.splice(index, 1);
      if (!done)
        promises.push(
          gen.next().then(({value: newVal, done: newDone}) => ({
            value: newVal,
            done: newDone,
            gen
          }))
        );
      return value;
    });
  }
};
