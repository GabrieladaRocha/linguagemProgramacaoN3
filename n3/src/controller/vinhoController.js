const Vinho = require('../models/vinho')

module.exports = {
    create: async function (req, res) {
        Vinho.create(req.body, function (err, pessoa) {
            if (err) {
                console.log(err)
                res.status(500).json({ status: "error", message: err.toString(), data: null });
            }
            else {
                res.json({ status: "success", message: "Cadastro adicionado com sucesso!", data: pessoa });
            }
        });
    },
    getByName: function (req, res) {
        Vinho.find({ nome: req.params.nome }, function (err, pessoa) {
            if (err) {
                res.status(500).json({ status: "error", message: err.toString(), data: null });
            } else {

                res.json({ status: "success", message: "Cadastro encontrado!", data: pessoa });
            }
        });
    },
    deleteById: function (req, res) {
        Vinho.deleteOne({ id: req.params._id }, function (err, pessoa) {
            if (err)
                res.status(500).json({ status: "error", message: err.toString(), data: null });
            else {
                res.json({ status: "success", message: "Cadastro deletado com sucesso!", data: null });
            }
        });
    },
    deleteAll: function (req, res) {
        Vinho.remove({}, function (err, pessoa) {
            if (err)
                res.status(500).json({ status: "error", message: err.toString(), data: null });
            else {
                res.json({ status: "success", message: "Cadastro deletado com sucesso!", data: null });
            }
        });
    },
    getAll: function (req, res) {
        Vinho.find()
            .exec()
            .then(
                function (pessoa) {
                    res.json({ status: "success", message: "Cadastro encontrado!", data: pessoa });
                },
                function (err) {
                    console.log(err)
                    res.status(500).json({ status: "error", message: err.toString(), data: null });
                }
            );
    },
}