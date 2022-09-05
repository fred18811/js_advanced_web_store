export const GoodsList = Vue.component('goods-list', {
    props: ['goods','noimg'],
    template: `
<div class="goods-list">
    <goods-item v-for="good in goods" :noimg="noimg" :good="good" :key="good.id"></goods-item>
</div>
`
});