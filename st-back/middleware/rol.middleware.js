// Middleware para verificar roles de usuario y quien puede acceder a ciertas rutas
const soloAdmin = (req, res, next) => {
  if (req.usuario.rol !== "admin") {
    return res.status(403).json({
      success: false,
      mensaje: "Acceso denegado",
    });
  }
  next();
};

const adminOTecnico = (req, res, next) => {
  if (req.usuario.rol === "admin" || req.usuario.rol === "tecnico") {
    return next();
  }
  return res.status(403).json({
    success: false,
    mensaje: "Permisos insuficientes",
  });
};

module.exports = {
  soloAdmin,
  adminOTecnico,
};
