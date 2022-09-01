import { GoodsItem } from "./components/GoodsItem.js";
import { CartButton } from "./components/CartButton.js";
import { SearchLine } from "./components/SearchLine.js";
import { HeaderComponent } from "./components/HeaderComponent.js";
import { MainComponent } from "./components/MainComponent.js";
import { GoodsList } from "./components/GoodsList.js";
import { WindowCart } from "./components/WindowCart.js";
import { CartGoodsItem } from "./components/CartGoodsItem.js";
import { Error } from "./components/Error.js";


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
