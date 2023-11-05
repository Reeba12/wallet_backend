import express from "express";
import { json, urlencoded } from "body-parser";
import appRoutes from './routes/index.js';
import bodyParser from 'body-parser';

const app = express();

app.use(json());
app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));
app.use('/api', appRoutes);

// setting port to 3000, & listening for requests http request.
const port = process.env.PORT || 3005;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
