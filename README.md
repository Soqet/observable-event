# Observable Events

## Example usage
```ts
let myEvent = new ObservableEvent<[string, number]>() //types of parameters

function foo(a: string, b: number) { //the types of parameters you specified earlier  
  console.log(`${a} ${b}`);
}

function bar(x: string, y: number) {
  console.log(`${y} ${x}`);
}

myEvent.subscribe(foo)
  .subscribe(bar)           //add foo and bar to subscribers
  .invokeSync('zxc', 123);  //call each subscriber with passed parameters
/* output: 
zxc 123
123 zxc
*/
myEvent.unsubscribe(bar)    //delete bar from subscribers
  .invokeSync('qwe', 321); 
/* output: 
qwe 321
*/
```

## Methods
`ObservableEvent<argT extends any[]>` argT is array of types what every function must take

`subscribe(fun: { (...args: argT): any })` add function to subscribers

`unsubscribe(fun: { (...args: argT): any })` delete function from subscribers

`invokeSync(...args: argT)` call each function with passed parameters synchronously

`invoke(..args: argT)` call each function with passed parameters asynchronously

every method returns `this` (except `invoke`, it returns a `Promise`)