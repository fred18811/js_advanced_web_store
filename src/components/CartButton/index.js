export const CartButton = Vue.component('cart-button', {
    template: `
        <button @click="$emit('change_state_cart')" class="cart-button" type="button">
            <slot></slot>
        </button>
    `
});