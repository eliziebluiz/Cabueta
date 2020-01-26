const mongoose = require('mongoose');

const DenunciaSchema = new mongoose.Schema({
    title: String,
    description: String,
    orgao: String,
    name_hash: String,
    image: String,
    increment: Number,
    assinaturas: Number
},{
    timestamps: true
});

module.exports = mongoose.model('Denuncia', DenunciaSchema);