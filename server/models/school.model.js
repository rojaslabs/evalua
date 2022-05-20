const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema(
    {
        nombreescuela: {
            type: String,
            required: [true, "el nombre de la escuela es requerido"],
        },
        direccionescuela: {
            type: String,
            required: [true, "la dirección de la escuela es requerido"],
        },
        ciudad: {
            type: String,
            required: [true, "la ciudad de la escuela es requerida"],
        },   
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    }
);

const School = mongoose.model('school', SchoolSchema );
module.exports = { SchoolSchema, School };