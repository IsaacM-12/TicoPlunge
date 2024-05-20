const mongoose = require("mongoose");
const Joi = require("joi");

const classSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    service: { type: String, required: true },
    capacity: { type: Number, required: true },
    students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }], // Lista de referencias a usuarios
  },
  { strict: "throw" }
);

const validateClass = (data) => {
  const schema = Joi.object({
    date: Joi.date().required().label("Date"),
    user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().label("User"), // Validación de ObjectId
    service: Joi.string().required().label("Service"),
    capacity: Joi.number().integer().min(0).required().label("Capacity"),
    students: Joi.array().items(
      Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
    ).label("Students"), // Validación para la lista de ObjectId
  });
  return schema.validate(data);
};

const Class = mongoose.model("Class", classSchema);

module.exports = { Class, validateClass };
