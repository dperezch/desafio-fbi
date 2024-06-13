import { Router } from "express";
import jwt from "jsonwebtoken";
import path from "node:path";

const router = Router();
const secretKey = process.env.SECRET_KEY;
router.get("/", (req, res) => {
  const { email, token } = req.query;
  /* Verificar que token y clave secreta son correctos */
  jwt.verify(token, secretKey, (err) => {
    /* Enviar error si token no es válido */
    if (err) {
      res.status(401).json({ status: 401, message: err.message });
    } else {
      res.sendFile(path.join(import.meta.dirname, "../static/dashboard.html"));
    }
  });
});

export { router };
