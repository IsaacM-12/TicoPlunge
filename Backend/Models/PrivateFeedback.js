const mongoose = require("mongoose");
const Joi = require("joi");

const privateFeedbackSchema = new mongoose.Schema(
  {
    comentario: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId, // Cambia de String a ObjectId
      ref: "User", // Referencia a la colección de usuarios
      required: false,
    },
    creationDate: { type: Date, default: Date.now }, // Añadido el campo creationDate
  },
  { strict: "throw" }
);

const validatePrivateFeedback = (data) => {
  const schema = Joi.object({
    comentario: Joi.string().required().label("Comentario"),
    user: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .label("User"), // Validación de ObjectId
  });
  return schema.validate(data);
};

const PrivateFeedback = mongoose.model(
  "PrivateFeedback",
  privateFeedbackSchema
); // Corrección del nombre del esquema

module.exports = { PrivateFeedback, validatePrivateFeedback };
