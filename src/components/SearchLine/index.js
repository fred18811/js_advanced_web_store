export const SearchLine = Vue.component('search-line', {
    props: ['search_line'],
    emits: ['update:search_line'],
    template: `
        <div>
            <input :value="search_line" @input="$emit('update:search_line', $event.target.value)" type="text">
        </div>
    `
});