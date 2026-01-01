const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      mensaje: "Token requerido",
    });
  }

  // Formato: Bearer TOKEN
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // { id, rol }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      mensaje: "Token inválido o expirado",
    });
  }
};

module.exports = { verificarToken };
