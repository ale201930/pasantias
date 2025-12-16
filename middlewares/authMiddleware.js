const jwt = require("jsonwebtoken");
const SECRET_KEY = "tu_clave_secreta_super_segura"; // Mejor usar process.env.JWT_SECRET

function verificarToken(rolesPermitidos = []) {
    return (req, res, next) => {
        const token = req.headers["authorization"];
        if (!token) return res.status(401).json({ ok: false, error: "No se proporcionó token" });

        try {
            const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
            req.user = decoded;

            if (rolesPermitidos.length && !rolesPermitidos.includes(decoded.rol)) {
                return res.status(403).json({ ok: false, error: "No tienes permisos para esta acción" });
            }

            next();
        } catch (err) {
            return res.status(401).json({ ok: false, error: "Token inválido o expirado" });
        }
    };
}

module.exports = { verificarToken, SECRET_KEY };
