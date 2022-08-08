window.addEventListener('load',()=>{

const goods = [
    { img: 'img/sneakers.jpg', title: 'Кеды'},
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

renderGoodsList(goods);

})



const renderGoodsItem = (img="img/no_photo.jpg", title=" ", price="0") => (`
    <div class="goods-item">
        <img src=${img}>
        <h3>${title}</h3>
        <p>${price} р.</p>
        <button>Добвить</button>
    </div>
`);
const renderGoodsList = list => {
    let goodsList = list.map(item => renderGoodsItem(item.img, item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join(' ');
}