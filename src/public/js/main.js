

const app = new Vue({
    el: '#app',
    data: {
        title: 'GENLog',
        logs: [],
        error: null
    },
    mounted() {
        axios.get('/logs')
            .then(res => {
                this.logs = res.data.map(item => ({
                    ...item,
                    time: new Date(item.time).toLocaleString()
                }));
            })
            .catch(this.handleErr)
        socket.on('connect', () => {
            console.log('connected')
        })
        socket.on('logEvent', this.handleSocketLogEvent);
    },
    methods: {
        range(n) {
            return Object.keys([...Array(n)]);
        },
        handleErr(err) {
            console.log(err)
            try {
                this.error = `${err.response.status}: ${err.response.statusText} :: ${JSON.stringify(err.response.data)}`;
            } catch (e) {
                this.error = 'an error has occured'
            }

        },
        closeErrorBanner() {
            this.error = null;
        },
        handleSocketLogEvent(_data) {
            const data = {..._data};
            if (typeof data.time === 'number') {
                data.time = new Date(data.time).toLocaleString()
            }
            this.logs.unshift(data)
        }
    },
    filters: {
        json(str) {
            return JSON.parse(str)
        }
    }
})