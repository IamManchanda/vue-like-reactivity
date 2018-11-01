/* Testing reactivity */

/* ** Code for the Perfect world **
let data = { price: 5, quantity: 2, discount: 0.1 };
let totalPrice, salePrice;
watcherInstance(() => {
  totalPrice = data.price * data.quantity;
});
watcherInstance(() => {
  salePrice = data.price * (1 - data.discount);
});
*/

console.log('Getting Starting Price');
console.log({ totalPrice, salePrice }); // { totalPrice: 10, salePrice: 4.5 }

console.log('Set `data.price` to 20');
data.price = 20;
console.log({ totalPrice, salePrice }); // { totalPrice: 40, salePrice: 18 }

console.log('Set `data.quantity` to 10');
data.quantity = 10;
console.log({ totalPrice, salePrice }); // { totalPrice: 200, salePrice: 18 }
