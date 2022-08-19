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



// 1) Какие виды областей видимости вы знаете? Написать ответ ниже
//   1)Глобальная
//   2)Блочная
//   3)Область видимости функции
//   4)Блок catch

// 2) Исправьте код так чтобы в консоль выводились числа от 0 до 10
for (var i = 0; i <= 10; i++) {
    (function(index) {
        setTimeout(() => {
            console.log(index);
         }, 0)
    })(i);
 }
 
 
 // 3) Исправьте код так чтобы в консоль выводилось "John"
 var firstName = "Elena"
 const obj = {
    firstName: 'John',
    sayFirstName: function() {
       console.log(this.firstName)
    }
 }
 obj.sayFirstName();
 
 
 // 4) Исправьте код так чтобы в консоль не выводилась ошибка (нельзя исправлять тело функции getArrowFunction)
 const user = {
    age: 20
 }
 function getArrowFunction() {
    "use strict"
    return () => {
       console.log(this.age)
    }
 }
 
 const arrowFunction = getArrowFunction.call(user);
 arrowFunction();