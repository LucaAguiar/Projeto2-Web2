const db = require("../config");

module.exports = {
    async getUsers(req, res) {
        db.Users.findAll()
            .then((users) => {
                if (users.length > 0) {
                    res.status(200).json(users);
                } else {
                    res.status(404).json({
                        error: "Nenhum usuário encontrado",
                    });
                }
            })
            .catch((error) => res.status(500).json(error));
    },

    async getUserByName(req, res) {
        const name = req.body.name;

        try {
            const user = await db.Users.findOne({
                where: { name: name },
            });

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: "Usuário não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    },

    async createUser(req, res) {
        const { username, name, password } = req.body;
        db.Users.create({ username, name, password })
            .then(res.status(200).json(req.body))
            .catch(() =>
                res.status(400).json({
                    error: "Solicitação inválida: Informações incorretas",
                })
            );
    },

    async updateUser(req, res) {
        const userId = req.params.id;

        try {
            const [updatedRows] = await db.Users.update(req.body, {
                where: { id: userId },
            });

            if (updatedRows > 0) {
                const updatedUser = await db.Users.findByPk(userId);
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ error: "Usuário não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    },

    async deleteUser(req, res) {
        const userId = req.params.id;

        try {
            const deletedRows = await db.Users.destroy({
                where: { id: userId },
            });

            if (deletedRows > 0) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: "Usuário não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    },
};
