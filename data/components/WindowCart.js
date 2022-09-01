export const WindowCart = Vue.component('window-cart', {
    data() {
        return {
           cartGoodsItems: []
        }
      },

    template: `
    <div class="background-fone">
        <div class="cart-box">
            <div class="closeBtnCart" @click="$emit('change_state_cart')">X</div>
            <div v-if="cartGoodsItems.length"><cart-goods-item v-for="item in cartGoodsItems" :item="item" :key="item.id" :addGood="addGood" :deleteGood="deleteGood"></cart-goods-item></div>
            <h1 v-else>Корзина пуста</h1>
        </div>
    </div>
    `,
    mounted(){
        service(CART_CATALOG)
            .then(data => this.cartGoodsItems = data) 
    },
    methods:{
        addGood(item){
            service(CART_CATALOG, 'PUT', {
                id: item.id_product
            })
                .then(data => {
                    service(CART_CATALOG)
                        .then(data => this.cartGoodsItems = data) 
                }) 
        },
        deleteGood(item){
            service(CART_CATALOG, 'DELETE', {
                id: item.id_product
            })
                .then(data => {
                    service(CART_CATALOG)
                        .then(data => this.cartGoodsItems = data) 
                }) 
        },
    }
});