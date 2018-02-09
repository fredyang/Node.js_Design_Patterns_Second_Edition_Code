"use strict";

const fs = require('fs');
const path = require('path');

function asyncFlow(generatorFunction) {

  function callback(err) {
    if (err) { 
      return generator.throw(err); 
    }
    const results = [].slice.call(arguments, 1);
    generator.next(results.length > 1 ? results : results[0]); 
  }
  //call a generator with callback
  const generator = generatorFunction(callback);

  generator.next(); 
}

asyncFlow(function* (callback) {
  //you define your work in generator, your generator
  //accept a callback, and this callback will passed as
  //a callback to your async api call, such as readFile, writeFile
  //you work will be run in a special way
  const fileName = path.basename(__filename);
  const myself = yield fs.readFile(fileName, 'utf8', callback);
  yield fs.writeFile(`clone_of_${fileName}`, myself, callback);
  console.log('Clone created');
});
