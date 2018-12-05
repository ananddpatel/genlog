const app = new Vue({
    el: '#app',
    data: {
        title: 'GENLog'
    },
    computed: {
        
    },
    methods: {
        range(n) {
            return Object.keys([...Array(n)]);
        }
    }
})