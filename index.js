const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { routes } = require('./src/routes');
mongoose.connect('mongodb://localhost:27017/mevnshop',
{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

routes.forEach(route => {
    app.use(`/api/v1/${route}`, require(`./src/routes/${route}`))
})

const PORT = 3000;
http.createServer({}, app).listen(PORT);

console.log(`SERVER STARTED AT PORT:${PORT}`);