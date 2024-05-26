const router = require("express").Router();
const {
  User,
  validate,
  validatePlanId: validatePlan,
} = require("../Models/User");
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
  const { plan, expirationDate } = req.body;

  try {
    // Validar el ID del plan
    const { error } = validatePlan( plan );
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    // Buscar y actualizar el usuario agregando el planId y la fecha de expiración al array de plans
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          plans: {
            plan: {
              name: plan.name,
              services: plan.services.map((service) => ({
                service: service.serviceId, // Asumiendo que serviceId es el ObjectId del servicio
                credits: service.credits,
              })),
            },
            expiration: expirationDate,
          },
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }

    // Generar un nuevo token JWT que refleje los cambios
    const token = user.generateAuthToken();

    // Enviar tanto el nuevo token como el usuario actualizado
    res.header("x-auth-token", token).send({
      message: "Plan añadido con éxito.",
      user,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
