const mongoose = require("mongoose");
const Joi = require("joi");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    encargados: [{
      type: mongoose.Schema.Types.ObjectId, // Cambia de String a ObjectId
      ref: 'User', // Referencia a la colección de usuarios
      required: false
    }],
  }, { strict: "throw" });

const validateService = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    encargados: Joi.array().items(Joi.string()).optional().label("Encargados"),
  });
  return schema.validate(data);
};

const Service = mongoose.model("Service", serviceSchema);

module.exports = { Service, validateService };