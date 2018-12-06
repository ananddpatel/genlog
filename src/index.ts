import * as dotenv from "dotenv";
dotenv.config();
import * as path from 'path';
// import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as express from 'express';
import { Server } from 'http';
import * as socketIO from 'socket.io';

import * as helloWorldController from './controllers/hello-world.controller';

const app = express();
const server = new Server(app);

const io = socketIO(server);
io.on('connect', client => {
    setInterval(() => {
        client.emit('myCustomEvent', {hello: 'world from server'})
    }, 2000)
    client.on('clientEvent', (data) => {
        console.log('clientEvent', data);
    })
    // client.on('genLogEvent2S', data => { console.log('socket backend genLogEvent2S', data) });
    // client.on('genLogEvent', data => { console.log('socket backend genLogEvent', data) });
    // client.on('disconnect', () => { console.log('socket backend disconnect ') });
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // logger

app.use('/public', express.static(path.join(__dirname, 'public/')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// mongoose.connect(
//     process.env.MONGO_URL as string,
//     { useNewUrlParser: true }
//   );

app.get('/', helloWorldController.index);

const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`Started at http://localhost:${port}`);
});