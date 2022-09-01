import { GoodsItem } from "./components/GoodsItem.js";
import { CartButton } from "./components/CartButton.js";
import { SearchLine } from "./components/SearchLine.js";
import { HeaderComponent } from "./components/HeaderComponent.js";
import { MainComponent } from "./components/MainComponent.js";
import { GoodsList } from "./components/GoodsList.js";
import { WindowCart } from "./components/WindowCart.js";
import { CartGoodsItem } from "./components/CartGoodsItem.js";
import { Error } from "./components/Error.js";
import { BASE, GOODS } from '../setting.js'
import { service } from './components/service.js';



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
