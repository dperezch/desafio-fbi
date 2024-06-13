import express from "express";
import { router as home } from "./routes/index.js";
import { router as login } from "./routes/login.js";
import { router as dashboard } from "./routes/dashboard.js";

const app = express();

app.use(express.json());

app.use("/", home);
app.use("/SignIn", login);
app.use("/dashboard", dashboard);
app.listen(3000, () => {
  console.log("listening on port 3000");
});
