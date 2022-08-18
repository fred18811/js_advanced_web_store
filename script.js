const goods = [
    { img: 'img/sneakers.jpg', title: 'Кеды' },
    { img: 'img/socks.jpg', title: 'Носки', price: 50 },
    { img: 'img/jacket.jpg', title: 'Куртка', price: 350 },
    { title: 'Shoes', price: 250 },
    { title: 'Shoes', price: 250 },
    { title: 'Shoes', price: 250 },
    { title: 'Shoes', price: 250 },
    { title: 'Shoes', price: 250 },
    { title: 'Shoes', price: 250 },
    { title: 'Shoes', price: 250 },
    { title: 'Shoes', price: 250 },
    { title: 'Shoes', price: 250 },
    { title: 'Shoes', price: 250 },
    { title: 'Shoes', price: 250 },
    { title: 'Shoes', price: 250 },
    { title: 'Shoes', price: 250 },
    { title: 'Shoes', price: 250 },
    { title: 'Shoes', price: 250 },
    { title: 'Shoes', price: 250 },
    { title: 'Shoes', price: 250 },
    { title: 'Shoes', price: 250 }
];

const BASE = ' https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS = '/catalogData.json';


window.addEventListener('load', () => {
    const goodsList = new GoodsList();
    goodsList.fetchGoods()
        .then(() => goodsList.render());
    //console.log(goodsList.calcGoods());
})

function service(url) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        const loadHandler = () => {
            resolve(JSON.parse(xhr.response))
        }
        xhr.onload = loadHandler;
        xhr.send();
    })
}

class GoodsItem {
    constructor({ img = "img/no_photo.jpg", product_name = " ", price = 0 }) {
        this.img = img;
        this.title = product_name;
        this.price = price;
    }
    render() {
        return `
        <div class="goods-item">
            <img src=${this.img}>
            <h3>${this.title}</h3>
            <p>${this.price} р.</p>
            <button>Добвить</button>
        </div>
    `;
    }
}

class GoodsList {
    goods = [];
    fetchGoods() {
        return service(`${BASE}${GOODS}`)
            .then(res => {
                this.goods = res;
            });
    }
    calcGoods() {
        return this.goods.reduce((a, { price }) => price ? a + price : a + 0, 0);
    }
    render() {
        const goodsList = this.goods.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        });
        document.querySelector('.goods-list').innerHTML = goodsList.join(' ');
    }
}