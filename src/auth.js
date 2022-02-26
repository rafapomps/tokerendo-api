
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    let token = req.headers["authorization"];

    if (!token)
     return res.status(401).json({auth: false, message: "Nenhum token fornecido."});

     token = token.substring("JWT ".length);

     jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if(err) 
            return res.status(500).send({auth: false, erro: "Falha ao verificar o token."});

        req.usuarioId = decoded.id;
        next();
     });
}