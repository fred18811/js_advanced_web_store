export const CartGoodsItem = Vue.component('cart-goods-item', {
    props: [
      'item',
      'addGood',
      'deleteGood'
    ],
    template: `
      <div class="cart-content-item">
         <h3>{{item?.data?.product_name}}</h3>
         <div>Колличество: {{item?.count}}</div>
         <div>Сумма: {{item?.total}}</div>
         <div><button @click="addGood(item)">+</button></div>
         <div><button @click="deleteGood(item)">-</button></div>
      </div>
    `
  });