// Middleware para verificar roles de usuario y quien puede acceder a ciertas rutas
// Middleware para verificar roles de usuario

const soloAdmin = (req, res, next) => {
  if (!req.usuario || req.usuario.rol !== "admin") {
    return res.status(403).json({
      success: false,
      mensaje: "Acceso denegado: solo admin",
    });
  }
  next();
};

const adminOTecnico = (req, res, next) => {
  if (!req.usuario) {
    return res.status(403).json({
      success: false,
      mensaje: "Usuario no autenticado",
    });
  }

  if (req.usuario.rol === "admin" || req.usuario.rol === "tecnico") {
    return next();
  }

  return res.status(403).json({
    success: false,
    mensaje: "Permisos insuficientes",
  });
};

// 👇 ESTO ES OBLIGATORIO
module.exports = {
  soloAdmin,
  adminOTecnico,
};
