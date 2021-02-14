export default class ObservableEvent<argT extends any[]>{

  private subscribers: Array<{ (...args: argT): any }>;

  constructor(){
    this.subscribers = new Array<{ (...args: argT): any }>();
  }

  subscribe(fun: { (...args: argT): any }) {
    for( var i = 0; i < this.subscribers.length; i++){ 
      if ( this.subscribers[i] === fun) { 
        return this; 
      }
    }
    this.subscribers.push(fun);
    return this;
  }

  unsubscribe(fun: { (...args: argT): any }) {
    for( var i = 0; i < this.subscribers.length; i++){ 
      if ( this.subscribers[i] === fun) { 
          this.subscribers.splice(i, 1); 
      }
    }
    return this;
  }

  invokeSync(...args: argT) {
   this.subscribers.forEach((element) => {
     element(...args);
   });
   return this;
  }

  async invoke(...args: argT) {
    let promises = new Array<any>();
    this.subscribers.forEach( (element) => {
      promises.push(element(...args))
    });
    await Promise.all(promises);
    return this;
  }
}