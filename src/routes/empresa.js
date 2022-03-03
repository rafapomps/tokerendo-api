var express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../auth");
const { Empresa } = require("../models");
var router = express.Router();

router.get("/", auth, async function (req, res) {
  res.send(await Empresa.findAll());
});

router.post("/", async function (req, res) {
  try {
    var empresa = await Empresa.create(req.body);
    const token = jwt.sign({ id: empresa.id }, process.env.SECRET, {
      expiresIn: 1000*60*60*24, 
    });

    return res.send({ auth: true, token: token, empresa})
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/me", auth, async function (req, res) {
  console.log(req);
  var empresa = await Empresa.findByPk(req.empresaId);
  try {
    if (empresa == null) throw new Error("Empresa não existe");

    res.send(empresa);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.get("/:id", async function (req, res) {
  var empresa = await Empresa.findByPk(req.params.id);
  try {
    if (empresa == null) throw new Error("Empresa não existe");

    res.send(empresa);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.put("/:id", async function (req, res) {
  var empresa = await Empresa.findByPk(req.params.id);

  try {
    if (empresa == null) throw new Error("Empresa não existe");


    await empresa.update(req.body);

    await empresa.reload();

    res.send(empresa);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.delete("/:id", async function (req, res) {
  var empresa = await Empresa.findByPk(req.params.id);
  try {
    if (empresa == null) throw new Error("Empresa não existe");

    await empresa.destroy();
    
    res.send(true);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});


module.exports = router;