

const app = new Vue({
    el: '#app',
    data: {
        title: 'GENLog'
    },
    mounted() {
        // socket.on('connect', client => {
        //     console.log('socket connected');
        // });
        setInterval(() => {
            console.log('clientEvent emit');
            
            socket.emit('clientEvent', {hello: 'world from client'})
        }, 2000)
        socket.on('myCustomEvent', function(data){
            console.log('server emitted myCustomEvent', data);
        });
        // socket.on('disconnect', function(){
        //     console.log('socket disconnect');
        // });
    },
    computed: {
        
    },
    methods: {
        range(n) {
            return Object.keys([...Array(n)]);
        }
    }
})