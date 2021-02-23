function pipeline(...functions) {
  return function(initial) {
    let lastResult;
    for (const fn of functions) {
      lastResult = fn(lastResult || initial);
    }
    return lastResult;
  };
}

module.exports = {
  pipeline,
};
