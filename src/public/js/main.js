

const app = new Vue({
    el: '#app',
    data: {
        title: 'GENLog',
        logs: []
    },
    mounted() {
        socket.on('connect', () => {
            console.log('connected')
        })
        socket.on('logEvent', (data) => {
            this.logs.unshift(data)
        });
    },
    computed: {
        
    },
    methods: {
        range(n) {
            return Object.keys([...Array(n)]);
        }
    },
    filters: {
        json(str) {
            return JSON.parse(str)
        }
    }
})