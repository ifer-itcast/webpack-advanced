function *fn() {
    yield 1;
    yield 2;
    return 3;
}
let it = fn();
console.log(it.next());
console.log(it.next());
console.log(it.next());


import "@babel/polyfill";
const arr = ['a', 'c', 'd'];
console.log(arr.includes('b'));