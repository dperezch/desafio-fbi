import { Router } from "express";
import jwt from "jsonwebtoken";
import { results as agentes } from "../data/agentes.js";

const router = Router();

/* Llave para JWT */
const secretKey = process.env.SECRET_KEY;
router.get("/", (req, res) => {
  const { email, password } = req.query;

  const buscarAgente = agentes.find(
    (agente) => agente.email === email && agente.password === password
  );
  if (buscarAgente) {
    /* Si las credenciales son correctas, crear token con 2 minutos de duración */
    const token = jwt.sign({ email: buscarAgente.email }, secretKey, {
      expiresIn: "2m",
    });
    /* Enviar HTML con enlace a ruta restringida */
    res.send(`
      <a href="/dashboard?email=${email}&token=${token}"> <p> Ir al Dashboard </p> </a> 
      <h3>${email}</h3>
      <script>
      sessionStorage.setItem('token', JSON.stringify("${token}"))
      </script>
      `);
  } else {
    res.status(401).json({ error: "credenciales invalidas" });
  }
});

export { router };
