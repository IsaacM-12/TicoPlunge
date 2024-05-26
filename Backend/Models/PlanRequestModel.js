const mongoose = require("mongoose");
const Joi = require("joi");

const planRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const validatePlanRequest = (data) => {
    const schema = Joi.object({
      user: Joi.string().required().label("User ID"),
      plan: Joi.string().required().label("Plan ID"),
    });
    return schema.validate(data);
  };

const PlanRequest = mongoose.model("PlanRequest", planRequestSchema);

module.exports = { PlanRequest, validatePlanRequest };