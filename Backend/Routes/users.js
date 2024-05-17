const router = require("express").Router();
const { User, validate } = require("../Models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")
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
module.exports = router;

