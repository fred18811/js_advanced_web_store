const BASE = ' https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS = '/catalogData.json';
const ERROR = 'Что то пошло не так!';

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
        <button>Добвить</button>
    </div>
    `
});
Vue.component('window-cart', {
    props: ['visible_cart'],
    template: `
    <div v-if="visible_cart" class="background-fone">
        <div class="cart-box">
            <div class="closeBtnCart" @click="$emit('change_state_cart')">X</div>
            text
        </div>
    </div>
    `
});

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
        fetch(`${BASE}${GOODS}`)
            .then(res => res.json())
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
