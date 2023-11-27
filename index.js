import express from "express";
import pkg from "body-parser";
import appRoutes from './routes/index.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import DBConnect from "./config/dbconnect.config.js";

const app = express();
const { json, urlencoded } = pkg;
DBConnect();
app.use(json());
app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));
app.use('/api', appRoutes);

app.use(cors());
// setting port to 3000, & listening for requests http request.
const port = process.env.PORT || 3005;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
