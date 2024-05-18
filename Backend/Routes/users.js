const router = require("express").Router();
const { User, validate } = require("../Models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")
const Joi = require("joi");
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
router.get('/',async (req,res)=>{
  try {
    const allUsers = await User.find()
    res.json(allUsers)
  } catch (error) {
    res.status(500).send({ message: "Error al consultar los usuarios" });
  }
})
router.delete("/:id", async (req, res) => {
  
  const userID = req.params.id;
  try {
    const resultado = await User.deleteOne({_id: userID }); // Eliminamos el comentario por su ID
    if (resultado.deletedCount === 1) {
      res.status(200).json({ message: "Usuario eliminado exitosamente." });
    } else {
      console.error("No se pudo encontrar el usuario para eliminar.");
      res.status(404).json({ error: "Usuario no encontrado." });
    }
  } catch (error) {
    console.error("Error al eliminar el usuario en MongoDB:", error);
    res.status(500).json({ error: "Error al eliminar el usuario en MongoDB" });
  }
});

router.put("/", async (req, res) => {
  console.log(req.body)
  const userId = req.body._id;

  // Validación solo de los campos que se van a actualizar
  const schema = Joi.object({
    firstName: Joi.string().label("First Name"),
    lastName: Joi.string().label("Last Name"),
    role: Joi.string().valid("Administrator", "Staff", "Client").label("Role"),
    creditos: Joi.number().min(0).label("Credits")
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    const updates = req.body;
    Object.keys(updates).forEach((key) => {
      user[key] = updates[key];
    });

    await user.save();
    res.send({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;

module.exports = router;

