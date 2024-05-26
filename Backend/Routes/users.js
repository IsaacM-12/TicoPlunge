const router = require("express").Router();
const { User, validate, validatePlanId } = require("../Models/User");
const bcrypt = require("bcrypt");

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

router.put("/addPlan/:userId", async (req, res) => {
  const { userId } = req.params;
  const { planId, expirationDate } = req.body;

  try {
    // Validar el ID del plan
    const { error } = validatePlanId({ planId, expirationDate });
    if (error) {
      console.log("error:", error)
      return res.status(400).send({ message: error.details[0].message });
    }

    // Buscar y actualizar el usuario agregando el planId y la fecha de expiración al array de plans
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { plans: { plan: planId, expiration: expirationDate } } },  // Usa $addToSet para evitar duplicados
      { new: true, runValidators: true } // Devuelve el documento actualizado y ejecuta los validadores del esquema
    ).populate('plans.plan');

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }

    // Generar un nuevo token JWT que refleje los cambios
    const token = user.generateAuthToken();

    // Enviar tanto el nuevo token como el usuario actualizado
    res.header('x-auth-token', token).send({
      message: "Plan añadido con éxito.",
      user,
      token
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
