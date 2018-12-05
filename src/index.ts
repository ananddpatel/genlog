import * as dotenv from "dotenv";
dotenv.config();
import * as path from 'path';
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as express from 'express';

const app = express();

import * as helloWorldController from './controllers/hello-world.controller';

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

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Started at http://localhost:${port}`);
});