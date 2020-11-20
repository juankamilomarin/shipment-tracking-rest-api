const { dbClient } = require("../common/services/node-postgres.service");

exports.list = async (_, res, next) => {
    const text = "SELECT id, name, active FROM store";

    dbClient.query(text)
        .then(result => {
            result.rows.length === 0
                ? res.status(204).send([])
                : res.status(200).send(result.rows);
        })
        .catch(error => next(error));
};

exports.getById = async (req, res) => {
    const text = "SELECT id, name, active FROM store WHERE id = $1";
    const values = [req.params.storeId];

    dbClient.query(text, values)
        .then(result => {
            result.rows.length === 0
                ? res.status(204).send({})
                : res.status(200).send(result.rows[0]);
        })
        .catch(error => next(error));
};

exports.insert = async (req, res) => {
    const text = "INSERT INTO store(name, active) VALUES ($1, $2) RETURNING id, name, active";
    const values = [req.body.name, req.body.active];

    dbClient.query(text, values)
        .then(result => {
            res.status(201).send(result.rows[0]);
        })
        .catch(error => next(error));
};

exports.delete = async (req, res) => {
    const text = "DELETE FROM store WHERE id = $1";
    const values = [req.params.storeId];

    dbClient.query(text, values)
        .then(() => {
            res.status(204).send({});
        })
        .catch(error => next(error));
};

// TODO Add controller for updating data