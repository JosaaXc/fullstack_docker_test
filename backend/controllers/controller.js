const Model = require('../models/model');
const pool = require('../bd/index');

const model = new Model(pool);

exports.postData = async (req, res) => {
    const { name } = req.body;
    const data = await model.save(name);
    res.status(200).json(data);
};