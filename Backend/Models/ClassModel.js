const mongoose = require("mongoose");
const Joi = require("joi");

const classSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    hour: { type: String, required: true },
    usuario: { type: String, required: true },
    service: { type: String, required: true },
    capacity: { type: Number, required: true },
  },
  { strict: "throw" }
);

const validateClass = (data) => {
  const schema = Joi.object({
    date: Joi.string().required().label("Date"),
    hour: Joi.string().required().label("Hour"),
    usuario: Joi.string().required().label("Usuario"),
    service: Joi.string().required().label("Service"),
    capacity: Joi.number().integer().min(1).required().label("Capacity"),
  });
  return schema.validate(data);
};

const Class = mongoose.model("Class", classSchema);

module.exports = { Class, validateClass };