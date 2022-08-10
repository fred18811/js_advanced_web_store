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
    { title: 'Shoes', price: 250 },
];


window.addEventListener('load', () => {
    const goodsList = new GoodsList();
    goodsList.fetchGoods();
    goodsList.render();
    console.log(goodsList.calcGoods());
})

class GoodsItem {
    constructor({ img = "img/no_photo.jpg", title = " ", price = 0 }) {
        this.img = img;
        this.title = title;
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
    fetchGoods(){
        this.goods = goods;
    }
    calcGoods(){
        const goodsCacl =  this.goods.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.price;
        })
        return goodsCacl.reduce((a,b)=>a+b);
    }
    render(){
        const goodsList = this.goods.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        });
        document.querySelector('.goods-list').innerHTML = goodsList.join(' ');
    }
}