var express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../auth");
const { Usuario } = require("../models");
var router = express.Router();

router.get("/", auth, async function (req, res) {
  res.send(await Usuario.findAll());
});

router.post("/", async function (req, res) {
  try {
    var usuario = await Usuario.create(req.body);
    const token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
      expiresIn: 1000*60*60*24, 
    });

    return res.send({ auth: true, token: token, usuario})
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/me", auth, async function (req, res) {
  console.log(req);
  var usuario = await Usuario.findByPk(req.usuarioId);
  try {
    if (usuario == null) throw new Error("Usuário não existe");

    res.send(usuario);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.get("/:id", async function (req, res) {
  var usuario = await Usuario.findByPk(req.params.id);
  try {
    if (usuario == null) throw new Error("Usuário não existe");

    res.send(usuario);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.put("/:id", async function (req, res) {
  var usuario = await Usuario.findByPk(req.params.id);

  try {
    if (usuario == null) throw new Error("Usuário não existe");


    await usuario.update(req.body);

    await usuario.reload();

    res.send(usuario);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.delete("/:id", async function (req, res) {
  var usuario = await Usuario.findByPk(req.params.id);
  try {
    if (usuario == null) throw new Error("Usuário não existe");

    await usuario.destroy();
    
    res.send(true);
  } catch (e) {
    res.status(500).send({ erro: e.message });
  }
});

router.post("/login", async function(req, res) {

  try{
    if(!req.body.email || !req.body.senha)
    throw new Error("E-mail ou senha inválidos")

    const usuario = await Usuario.findOne({
      where: {
        email: req.body.email,
        senha: req.body.senha
      }
    });

    if(usuario == null) 
      throw new Error("E-mail ou senha inválidos");

      const token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
        expiresIn: 1000*60*60*24, 
      });

      return res.send({ auth: true, token: token})
  }
  catch (e){
    res.status(500).send({erro: e.message});
  }
});

module.exports = router;