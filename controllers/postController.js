const db = require("../config");

module.exports = {
    async getPosts(req, res) {
        db.Posts.findAll()
            .then((posts) => {
                if (posts.length > 0) {
                    res.status(200).json(posts);
                } else {
                    res.status(404).json({
                        error: "Nenhuma postagem encontrada.",
                    });
                }
            })
            .catch((error) => res.status(500).json(error));
    },

    async getPostById(req, res) {
        const postId = req.params.id;

        try {
            const post = await db.Posts.findByPk(postId);

            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ error: "Postagem não encontrada." });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor." });
        }
    },

    async getPostByUserId(req, res) {
        const userId = req.params.id;

        try {
            const user = await db.Users.findByPk(userId, {
                include: [
                    {
                        model: db.Posts,
                        as: "posts",
                    },
                ],
            });

            if (user) {
                res.status(200).json(user.posts || []);
            } else {
                res.status(404).json({ error: "Usuário não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    },

    async createPost(req, res) {
        const { content, user_id } = req.body;
        db.Posts.create({ content, user_id, likes: 0 })
            .then(res.status(200).json(req.body))
            .catch(() =>
                res.status(400).json({
                    error: "Solicitação inválida: Informações incorretas.",
                })
            );
    },

    async deletePost(req, res) {
        const postId = req.params.id;

        try {
            const deletedRows = await db.Posts.destroy({
                where: { id: postId },
            });

            if (deletedRows > 0) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: "Postagem não encontrada." });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor." });
        }
    },
};
