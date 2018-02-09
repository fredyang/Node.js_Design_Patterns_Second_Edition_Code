"use strict";

const fs = require('fs');
const path = require('path');

function asyncFlowWithThunks(generatorFunction) {
  function callback(err) {
    if (err) {
      return generator.throw(err); 
    }
    const results = [].slice.call(arguments, 1);
    const thunk = generator.next(results.length > 1 ? results : results[0]).value;
    thunk && thunk(callback);
  }
  const generator = generatorFunction();
  const thunk = generator.next().value;
  thunk && thunk(callback);
}

const thunkify = (fn, ctx/*optional*/) => {
  return (...args) => {
    return (callback) => {
      return fn.apply(ctx, args.concat(callback));
    };
  };
};

const readFile = thunkify(fs.readFile);
const writeFile = thunkify(fs.writeFile);

// const readFileThunk = (filename, options) => {
//   return (cb) => {
//     fs.readFile(filename, options, cb);
//   }
// };

// const writeFileThunk = (filename, options) => {
//   return (cb) => {
//     fs.writeFile(filename, options, cb);
//   }
// };

asyncFlowWithThunks(function* () {
  const fileName = path.basename(__filename);
  // const myself = yield readFileThunk(fileName, 'utf8');
  // yield writeFileThunk(`clone_of_${fileName}`, myself);
  // const myself = yield readFile(fileName, 'utf8');
  // yield writeFile(`clone_of_${fileName}`, myself);
  const myself = yield thunkify(fs.readFile, fs)(fileName, 'utf8');
  yield thunkify(fs.writeFile, fs)(`clone_of_${fileName}`, myself);
  console.log('Clone created');
});
