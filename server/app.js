const express = require('express')
const routes = require('./routes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/', routes);

const port = 3005;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});