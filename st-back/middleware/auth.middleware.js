const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      mensaje: "Token requerido",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        mensaje: "Token inválido",
      });
    }

    req.usuario = decoded;
    next();
  });
};

// 🚨 ESTO ES CLAVE
module.exports = verificarToken;
