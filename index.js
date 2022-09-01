const BASE = ' https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS_CATALOG = `${BASE}/catalogData.json`;
const CART_CATALOG = './data/cart.json'


const request = require('request-promise')
const express = require('express');
const cors = require('cors');
const { writeFile, readFile } = require('fs/promises');

const app = express();

function getRawCartGoods() {
  return readFile(CART_CATALOG, 'utf-8').then(text => {
    return JSON.parse(text);
  });
}
function getGoodsCatalog() {
  return request(GOODS_CATALOG)
    .then(body => JSON.parse(body));
}

function getCartGoods() {
  return Promise.all([getRawCartGoods(), getGoodsCatalog()]).then(([rawCartGoods, goodsCatalog]) => {
    return rawCartGoods.map((rawCartGoods) => {
      const { id_product, count } = rawCartGoods;
      const good = goodsCatalog.find(({ id_product: goodsId }) => goodsId === id_product);
      return {
        ...rawCartGoods,
        data: good,
        total: count * good.price
      }
    })
  })
}

function addCartGoods(id) {
  return getRawCartGoods().then(res => {
    if (res.find(({ id_product }) => id_product === id)) {
      const resuslt = res.map((cartGood) => {
        if (cartGood.id_product === id) {
          return {
            ...cartGood,
            count: cartGood.count + 1
          }
        }
        else return cartGood;
      })
      return resuslt;
    }
    else {
      return [
        ...res,
        {
          id_product: id,
          count: 1
        }
      ]
    }
  }).then((result) => {
    return writeFile(CART_CATALOG, JSON.stringify(result))
      .then(() => { return result })
  })
}

function deleteCartGoods(id) {
  return getRawCartGoods().then(res => {
    if (res.find(({ id_product }) => id_product === id)) {
      const resuslt = res.map((cartGood) => {
        if (cartGood.id_product === id) {
          if (cartGood.count === 1){}
          else return {
            ...cartGood,
            count: cartGood.count - 1
          }
        }
        else return cartGood;
      })
      return resuslt.filter(Boolean);
    }
  }).then((result) => {
    return writeFile(CART_CATALOG, JSON.stringify(result))
      .then(() => { return result })
  })
}

app.use(cors());
app.use(express.static('data'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get('/catalogGoods', (req, res) => {
  getGoodsCatalog()
    .then(data => res.send(data))
});
app.get('/goodsCart', (req, res) => {
  getCartGoods().then(data => res.send(data))
});
app.put('/goodsCart', (req, res) => {
  addCartGoods(req.body.id).then(data => {
    res.send(JSON.stringify(data))
  })
});
app.delete('/goodsCart', (req, res) => {
  deleteCartGoods(req.body.id).then(data => {
    res.send(JSON.stringify(data))
  })
});


app.listen(8000, () => {
  console.log('server is running on port 8000!');
});




