import { GoodsItem } from "./components/GoodsItem/index.js";
import { CartButton } from "./components/CartButton/index.js";
import { SearchLine } from "./components/SearchLine/index.js";
import { HeaderComponent } from "./components/HeaderComponent/index.js";
import { MainComponent } from "./components/MainComponent/index.js";
import { GoodsList } from "./components/GoodsList/index.js";
import { WindowCart } from "./components/WindowCart/index.js";
import { CartGoodsItem } from "./components/CartGoodsItem/index.js";
import { Error } from "./components/Error/index.js";
import { BASE, GOODS } from "./constants/index.js";
import { service } from "./service/index.js"


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
