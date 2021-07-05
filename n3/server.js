const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes)

mongoose.connect('mongodb+srv://PODI:teste@2021@cluster0.lb0cu.mongodb.net/PODI?retryWrites=true&w=majority',
{useNewUrlParser: true,
useUnifiedTopology: true
})

const port = 9090;

app.listen(port, () => console.log("Servidor rodando local na porta 9090"));