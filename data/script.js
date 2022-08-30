const BASE = 'http://localhost:8000';
const GOODS = '/catalogGoods';
const CART_CATALOG = `${BASE}/goodsCart`;
const ERROR = 'Что то пошло не так!';

function service(url, method="GET", body) {
    return fetch(url,{
    headers: Object.assign({}, body ? {
      'Content-Type': 'application/json; charset=utf-8'
    } : {}),
    method,
    body: JSON.stringify(body)
  })
  .then((res) => res.json())
}

Vue.component('cart-button', {
    template: `
        <button @click="$emit('change_state_cart')" class="cart-button" type="button">
            <slot></slot>
        </button>
    `
});
Vue.component('search-line', {
    props: ['search_line'],
    emits: ['update:search_line'],
    template: `
        <div>
            <input :value="search_line" @input="$emit('update:search_line', $event.target.value)" type="text">
        </div>
    `
});
Vue.component('header-component', {
    template: `
    <header>
        <div class="vertical-paddindg">
            <a href="">
                <h1>Store</h1>
            </a>
            <slot></slot>
        </div>
    </header>
    `
});
Vue.component('main-component', {
    template: `
    <main class="vertical-paddindg">
        <slot></slot>
    </main>
    `
});
Vue.component('goods-list', {
    props: ['goods','noimg'],
    template: `
<div class="goods-list">
    <goods-item v-for="good in goods" :noimg="noimg" :good="good" :key="good.id"></goods-item>
</div>
`
});
Vue.component('goods-item', {
    props: ['good','noimg'],
    template: `
    <div class="goods-item">
        <img v-if="good.img" :src="good.img">
        <img v-else :src="noimg">
        <h3>{{good.product_name}}</h3>
        <p>{{good.price}} р.</p>
        <button @click="addGood">Добвить</button>
    </div>
    `,
    methods:{
        addGood(){
            service(CART_CATALOG, 'PUT', {
                id: this.good.id_product
            })
        }
    }
});

Vue.component('window-cart', {
    data() {
        return {
           cartGoodsItems: []
        }
      },

    template: `
    <div class="background-fone">
        <div class="cart-box">
            <div class="closeBtnCart" @click="$emit('change_state_cart')">X</div>
            <div v-if="cartGoodsItems.length"><cart-goods-item v-for="item in cartGoodsItems" :item="item" :key="item.id" :addGood="addGood" :deleteGood="deleteGood"></cart-goods-item></div>
            <h1 v-else>Корзина пуста</h1>
        </div>
    </div>
    `,
    mounted(){
        service(CART_CATALOG)
            .then(data => this.cartGoodsItems = data) 
    },
    methods:{
        addGood(item){
            service(CART_CATALOG, 'PUT', {
                id: item.id_product
            })
                .then(data => {
                    service(CART_CATALOG)
                        .then(data => this.cartGoodsItems = data) 
                }) 
        },
        deleteGood(item){
            service(CART_CATALOG, 'DELETE', {
                id: item.id_product
            })
                .then(data => {
                    service(CART_CATALOG)
                        .then(data => this.cartGoodsItems = data) 
                }) 
        },
    }
});

Vue.component('cart-goods-item', {
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
  })


Vue.component('error', {
    template: `
        <p><slot></slot></p>
    `
});


var app = new Vue({
    el: '#app',
    data: {
        error: "",
        noImg: 'img/no_photo.jpg',
        searchLine: '',
        isVisibleCart: false,
        goods: [],
    },
    methods: {
        changeStateCart: function () {
            this.isVisibleCart = this.isVisibleCart ? false : true;
        }
    },
    mounted() {
        service(`${BASE}${GOODS}`)
            .then(data => this.goods = data)
            .catch(err => this.error = ERROR)
    },
    computed: {
        filteredItems() {
            return this.goods.filter(({product_name}) => {
                const regExp = new RegExp(this.searchLine, 'i');
                return regExp.test(product_name);
            })
        }
    }
})
