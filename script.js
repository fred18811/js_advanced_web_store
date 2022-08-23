const BASE = ' https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS = '/catalogData.json';

var app = new Vue({
    el: '#app',
    data: {
        noImg:'img/no_photo.jpg',
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
    }
})