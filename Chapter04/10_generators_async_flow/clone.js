"use strict";

const fs = require('fs');
const path = require('path');

function asyncFlow(generatorFunction) {

  //this callback is passend in standard nodejs
  //async api, asyncTask(callback)
  //when the async task is done inside of the generator
  //the callback passed in the result of the asyncTask 
  //by calling generataor.next(result);
  //inside the generator, the line
  //let result = yield asyncTask(callback),
  //the result will get the result of asyncTask
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

asyncFlow(function* (asyncFlowCallback) {
  //you define your task in a generator,
  // your generator will be passed
  //in a asyncFlowCallback, the order of your task
  //is in serial order.
  const fileName = path.basename(__filename);
  const myself = yield fs.readFile(fileName, 'utf8', asyncFlowCallback);
  yield fs.writeFile(`clone_of_${fileName}`, myself, asyncFlowCallback);
  console.log('Clone created');

});
