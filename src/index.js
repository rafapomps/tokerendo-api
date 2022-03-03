require("dotenv-safe").config();

var express = require("express");
var morgan = require("morgan");
var cors = require("cors");
const { database } = require("./models");
var app = express();

app.use(express.json());
app.use(cors());

app.use(morgan("combined"));

var usuarios = require("./routes/usuarios");

app.use("/usuarios", usuarios);

var eventos = require("./routes/eventos");

app.use("/eventos", eventos);

var empresas = require("./routes/empresa");

app.use("/empresa", empresas);


app.get("/", function (req, res) {
    res.send("Tokerendo - API");
  });
  
  database.sync().then(() => {
    app.listen(process.env.PORT, function () {
      console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });
  });