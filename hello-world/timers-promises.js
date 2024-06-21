const { setTimeout, setImmediate, setInterval, clearTimeout, clearImmediate, clearInterval } = require('timers');

module.exports = {
  setTimeout: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  setImmediate: () => new Promise(resolve => setImmediate(resolve)),
  setInterval: (fn, ms) => {
    const id = setInterval(fn, ms);
    return {
      id,
      clear: () => clearInterval(id)
    };
  },
  clearTimeout,
  clearImmediate,
  clearInterval
};
