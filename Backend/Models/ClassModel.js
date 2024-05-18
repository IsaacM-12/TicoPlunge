const mongoose = require("mongoose");
const Joi = require("joi");

const classSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    usuario: { type: String, required: true },
    service: { type: String, required: true },
    capacity: { type: Number, required: true },
    students: [{ type: String }], // Lista de estudiantes
  },
  { strict: "throw" }
);

const validateClass = (data) => {
  const schema = Joi.object({
    date: Joi.date().required().label("Date"),
    usuario: Joi.string().required().label("Usuario"),
    service: Joi.string().required().label("Service"),
    capacity: Joi.number().integer().min(1).required().label("Capacity"),
    students: Joi.array().items(Joi.string()).label("Students"), // Validación para la lista de estudiantes
  });
  return schema.validate(data);
};

const Class = mongoose.model("Class", classSchema);

module.exports = { Class, validateClass };
