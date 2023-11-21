const db = require("../config");

module.exports = {
    async getComments(req, res) {
        db.Comments.findAll()
            .then((comments) => {
                if (comments.length > 0) {
                    res.status(200).json(comments);
                } else {
                    res.status(404).json({
                        error: "Nenhum comentário encontrado.",
                    });
                }
            })
            .catch((error) => res.status(500).json(error));
    },

    async getCommentsByPostId(req, res) {
        const postId = req.params.id;

        try {
            const post = await db.Posts.findByPk(postId, {
                include: [
                    {
                        model: db.Comments,
                        as: "comments",
                    },
                ],
            });

            if (post) {
                res.status(200).json(post.comments || []);
            } else {
                res.status(404).json({ error: "Postagem não encontrada." });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    },

    async createComment(req, res) {
        const { content, user_id, post_id } = req.body;
        db.Comments.create({ content, user_id, post_id })
            .then(res.status(200).json(req.body))
            .catch(() =>
                res.status(400).json({
                    error: "Solicitação inválida: Informações incorretas.",
                })
            );
    },

    async deleteComment(req, res) {
        const commentId = req.params.id;

        try {
            const deletedRows = await db.Comments.destroy({
                where: { id: commentId },
            });

            if (deletedRows > 0) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: "Comentário não encontrado." });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor." });
        }
    },
};
