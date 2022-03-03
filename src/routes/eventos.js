var express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../auth");
const { Evento } = require("../models");
var router = express.Router();

router.get("/", auth, async function (req, res) {
  res.send(await Evento.findAll());
});

router.post("/", async function (req, res) {
  try {
    var evento = await Evento.create(req.body);
    const token = jwt.sign({ id: evento.id }, process.env.SECRET, {
      expiresIn: 1000*60*60*24, 
    });

    return res.send({ auth: true, token: token, evento})
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", async function (req, res) {
  var evento = await Evento.findByPk(req.params.id);
  try {
    if (evento == null) throw new Error("Evento não existe");

    res.send(evento);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.put("/:id", async function (req, res) {
  var evento = await Evento.findByPk(req.params.id);

  try {
    if (evento == null) throw new Error("Evento não existe");


    await evento.update(req.body);

    await evento.reload();

    res.send(evento);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.delete("/:id", async function (req, res) {
  var evento = await Evento.findByPk(req.params.id);
  try {
    if (evento == null) throw new Error("Evento não existe");

    await evento.destroy();
    
    res.send(true);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

module.exports = router;