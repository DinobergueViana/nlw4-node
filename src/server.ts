import express from 'express';

const app = express();

// definindo as primeiras rotas de acesso
app.get("/", (req, res) => {
  return res.status(200).json({msg: "Hello World! NLW4 Node!!"})
});

app.post("/", (req, res) => {
  return res.status(201).json({msg: "User created"})
});

// levantando servidor
app.listen(3000, () => console.log("Server is running!"));
