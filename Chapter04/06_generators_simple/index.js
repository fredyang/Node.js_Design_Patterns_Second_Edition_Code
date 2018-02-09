"use strict";

function* fruitGenerator() {
  console.log("yield 'apple'");
  yield 'apple';
  console.log("yield 'orange'");
  yield 'orange';
  console.log("yield 'watermelon'");
  yield 'watermelon';
  console.log("the end");
}

const newFruitGenerator = fruitGenerator();
console.log(newFruitGenerator.next());    //[1]
console.log(newFruitGenerator.next());    //[2]
console.log(newFruitGenerator.next());    //[3]
console.log(newFruitGenerator.next());    //[4]
