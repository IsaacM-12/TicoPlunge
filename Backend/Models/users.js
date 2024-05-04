const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },  // Ensure email is unique
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['Administrator', 'Staff', 'Client'] },  // New field for role
});

// Modify the token generation to include the user role
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, role: this.role }, process.env.JWTPRIVATEKEY, {
        expiresIn: "2d",
    });
    return token;
};

const User = mongoose.model("User", userSchema);  // Capitalized the model name conventionally

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        role: Joi.string().valid('Administrator', 'Staff', 'Client').required().label("Role"),  // Validation for role
    });
    return schema.validate(data);
};

module.exports = { User, validate };