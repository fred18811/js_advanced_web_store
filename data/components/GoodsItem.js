export const GoodsItem = Vue.component('goods-item', {
    props: ['good','noimg'],
    template: `
    <div class="goods-item">
        <img v-if="good.img" :src="good.img">
        <img v-else :src="noimg">
        <h3>{{good.product_name}}</h3>
        <p>{{good.price}} р.</p>
        <button @click="addGood">Добвить</button>
    </div>
    `,
    methods:{
        addGood(){
            service(CART_CATALOG, 'PUT', {
                id: this.good.id_product
            })
        }
    }
});