const express = require("express");
const swaggerUI = require("swagger-ui-express");
const app = express();
const swaggerDocument = require("./swagger.json");
const routes = require("./router");
const port = 3000;

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
// Middleware para analisar JSON nas solicitações
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
