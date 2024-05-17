const mongoose = require("mongoose");
const Joi = require("joi");

const privateFeedbackSchema = new mongoose.Schema(
  {
    comentario: { type: String, required: true },
    usuario: { type: String, required: true },
    creationDate: { type: Date, default: Date.now }, // Añadido el campo creationDate
  },
  { strict: "throw" }
);

const validatePrivateFeedback = (data) => {
  const schema = Joi.object({
    comentario: Joi.string().required().label("Comentario"),
    usuario: Joi.string().required().label("Usuario"),
  });
  return schema.validate(data);
};

const PrivateFeedback = mongoose.model(
  "PrivateFeedback",
  privateFeedbackSchema
); // Corrección del nombre del esquema

module.exports = { PrivateFeedback, validatePrivateFeedback };
