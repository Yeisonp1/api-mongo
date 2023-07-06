const express = require('express');
const hostname = 'localhost';
const port = 3000;
const routerApi = require("./routes")
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.json());

routerApi(app);

app.listen(port,hostname, ()=>{
    console.log(`El servidor esta escuchando en http://${hostname}:${port}`)
});

app.get("/", (req, res) =>{
    res.status(200).send("Api constru-tech")
})

