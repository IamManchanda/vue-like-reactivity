let data = { price: 5, quantity: 2, discount: 0.1 };
let totalPrice, salePrice;
let target = null;

class Dep {
  constructor () {
    this.subscribers = [] ;
  }
  depend() {
    if (target && !this.subscribers.includes(target)) this.subscribers.push(target);
  }
  notify() {
    this.subscribers.forEach(sub => sub());
  }
}

Object.keys(data).forEach((key) => {
  let internalValue = data[key];
  const dep = new Dep();

  Object.defineProperty(data, key, {
    get() {
      dep.depend();
      return internalValue;
    },
    set(newValue) {
      internalValue = newValue;
      dep.notify();
    },
  })
});

const watcherInstance = (fun) => {
  target = fun;
  target();
  target = null;
};

watcherInstance(() => {
  totalPrice = data.price * data.quantity;
});

watcherInstance(() => {
  salePrice = data.price * (1 - data.discount);
});
