const mongoose = require("mongoose");
const Joi = require("joi");

// Definición del esquema de Plan
const planSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    services: [
      {
        service: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Service',
          required: true,
        },
        credits: { type: Number, required: true },
      }
    ],
    price: { type: Number, required: true },
  },
  { strict: "throw" }
);

// Función de validación usando Joi
const validatePlan = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    services: Joi.array().items(
      Joi.object({
        service: Joi.string().required().label("Service"),
        credits: Joi.number().min(0).required().label("Credits"),
      })
    ).required().label("Contracted Services"),
    price: Joi.number().min(0).required().label("Price"),
  });
  return schema.validate(data);
};

const Plan = mongoose.model("Plan", planSchema);

module.exports = { Plan, validatePlan };