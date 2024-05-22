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
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },
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
    user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow('').label("User"), // Validación de ObjectId, permitiendo vacío
    service: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().label("Service"), // Validación de ObjectId para el servicio
    capacity: Joi.number().integer().min(1).required().label("Capacity"),
    students: Joi.array().items(
      Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
    ).label("Students"), // Validación para la lista de ObjectId
  });
  return schema.validate(data);
};

const Class = mongoose.model("Class", classSchema);

module.exports = { Class, validateClass };
