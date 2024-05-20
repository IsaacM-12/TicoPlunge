const mongoose = require("mongoose");
const Joi = require("joi");

const feedbackSchema = new mongoose.Schema(
  {
    comentario: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    creationDate: { type: Date, default: Date.now },
    user: {
      type: mongoose.Schema.Types.ObjectId, // Cambia de String a ObjectId
      ref: "User", // Referencia a la colección de usuarios
      required: false,
    },
  },
  { strict: "throw" }
);

const validateFeedback = (data) => {
  const schema = Joi.object({
    comentario: Joi.string().required().label("Comentario"),
    rating: Joi.number().integer().min(1).max(5).required().label("Rating"),
    user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).label("User") // Validación de ObjectId
  });
  return schema.validate(data);
};

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = { Feedback, validateFeedback };
