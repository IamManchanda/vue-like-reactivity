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

const traps = {
  get(obj, key) {
    deps.get(key).depend();
    return obj[key];
  },
  set(obj, key, newValue) {
    obj[key] = newValue;
    deps.get(key).notify();
    return true;
  },
};

let deps = new Map();
Object.keys(data).forEach((key) => {
  deps.set(key, new Dep());
});

let dataWithoutProxy = data;
data = new Proxy(dataWithoutProxy, traps);

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
