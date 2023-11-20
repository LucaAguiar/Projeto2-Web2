const express = require("express");
const swaggerUI = require("swagger-ui-express");
const app = express();
const swaggerDocument = require("./swagger.json");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
const port = 3000;

// Middleware para analisar JSON nas solicitações
app.use(express.json());

// Simulando uma lista de usuários
let users = [
    { id: 1, username: "luca", password: "1234", name: "Luca" },
    { id: 2, username: "luan", password: "4321", name: "Luan" },
];

// Simulando uma lista de tarefas
let tasks = [
    { id: 1, description: "Comprar pão" },
    { id: 2, description: "Estudar Node.js" },
    { id: 3, description: "Fazer exercícios" },
];

// Rota para obter todos os usuários
app.get("/users", (req, res) => {
    res.status(200).json(users);
});

// Rota para criar um novo usuário
app.post("/users", (req, res) => {
    const newUser = req.body;
    if (newUser.username && newUser.password && newUser.name) {
        newUser.id = users.length + 1;
        users.push(newUser);
        res.status(201).json(newUser);
    }
    res.status(400).json({
        error: "Solicitação inválida: dados incorretos ou insuficientes",
    });
});

// Rota para atualizar um usuário por ID
app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const updatedUser = req.body;

    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        res.status(404).json({ error: "Usuário não encontrado" });
    } else {
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        res.status(200).json(users[userIndex]);
    }
});

// Rota para excluir um usuário por ID
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        res.status(404).json({ error: "Usuário não encontrado" });
    } else {
        users.splice(userIndex, 1);
        res.status(204).send();
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
