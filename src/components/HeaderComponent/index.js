export const HeaderComponent = Vue.component('header-component', {
    template: `
    <header>
        <div class="vertical-paddindg">
            <a href="">
                <h1>Store</h1>
            </a>
            <slot></slot>
        </div>
    </header>
    `
});