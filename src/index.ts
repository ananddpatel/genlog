import * as dotenv from "dotenv";
dotenv.config();
import * as path from 'path';
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as express from 'express';
import { Server } from 'http';
import * as socketIO from 'socket.io';

import * as helloWorldController from './controllers/hello-world.controller';

const app = express();
const server = new Server(app);

let socketClient;

const io = socketIO(server);
io.on('connect', client => {
    if (!socketClient) {
        socketClient = client
        console.log('connected');
    }
});


export const emitLogEvent = (logData) => {
    if (socketClient) {
        console.log('emitted data');
        
        socketClient.emit('logEvent', logData)
    }
}


// setInterval(() => {
//     // console.log(socketClient);
    
//     emitLogEvent({
//         time: new Date().toLocaleString(),
//         app: 'server',
//         type: 'info',
//         message: 'simple message from server',
//         payload: {hello: 'world from server'}
//     })
// }, 2000);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // logger

app.use('/public', express.static(path.join(__dirname, 'public/')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect(
    process.env.MONGO_URL as string,
    { useNewUrlParser: true }
  );

app.get('/', helloWorldController.index);
app.post('/log', helloWorldController.emitLog);

const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`Started at http://localhost:${port}`);
});