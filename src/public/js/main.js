

const app = new Vue({
    el: '#app',
    data: {
        title: 'GENLog'
    },
    mounted() {
        socket.on('connect', client => {
            console.log('socket connected');
            setInterval(() => {
                client.emit('genLogEvent', {hello: 'world from client'})
            }, 2000)
        });
        socket.on('genLogEvent2S', function(data){
            console.log('socket genLogEvent2S', data);
        });
        socket.on('disconnect', function(){
            console.log('socket disconnect');
        });
    },
    computed: {
        
    },
    methods: {
        range(n) {
            return Object.keys([...Array(n)]);
        }
    }
})