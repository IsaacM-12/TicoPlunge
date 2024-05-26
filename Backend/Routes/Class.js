const router = require("express").Router();
const { Class, validateClass } = require("../Models/ClassModel");
const { User, validate } = require("../Models/User");
const mongoose = require("mongoose");
const { Service } = require("../Models/ServiceModel");

// Ruta para obtener todas las clases
router.get("/", async (req, res) => {
  try {
    // Obtenemos el filtro de la consulta
    const filtro = req.query.filtro;
    // Si hay un filtro en la consulta, lo utilizamos en la consulta a la base de datos
    let clases;
    if (filtro) {
      // Convierte el filtro de cadena JSON a objeto
      const filtroObj = JSON.parse(filtro);
      clases = await Class.find(filtroObj)
        .populate("user")
        .populate("students")
        .populate("service");
    } else {
      // Si no hay filtro en la consulta, simplemente obtenemos todas las clases
      clases = await Class.find()
        .populate("user")
        .populate("students")
        .populate("service");
    }

    res.json(clases); // Devuelve las clases como JSON
  } catch (error) {
    console.error("Error al consultar clases en MongoDB:", error);
    res.status(500).json({ error: "Error al consultar clases en MongoD" });
  }
});

// Ruta para agregar una nueva clase
router.post("/", async (req, res) => {
  // Extraemos los datos de la clase del cuerpo de la solicitud
  const claseData = req.body;
  // Validamos los datos de la clase
  const { error } = validateClass(claseData);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Verificar si ya existe una clase con los mismos datos de fecha, hora, usuario y servicio
    const existingClass = await Class.findOne({
      date: claseData.date,
      usuario: claseData.usuario,
      service: claseData.service,
    });

    if (existingClass) {
      return res
        .status(400)
        .json({ error: "Ya existe una clase con estos mismos datos." });
    }

    // Si no existe, creamos una nueva clase
    const nuevaClase = await Class.create(claseData);
    res.status(201).json({
      message: "Clase agregada exitosamente.",
      clase: nuevaClase,
    });
  } catch (error) {
    console.error("Error al agregar clase en MongoDB:", error);
    res.status(500).json({ error: "Error al agregar clase en MongoDB" });
  }
});

// Ruta para actualizar una clase existente
router.put("/:id", async (req, res) => {
  const claseId = req.params.id;

  // Validar que claseId sea un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(claseId)) {
    return res.status(400).json({ error: "ID de clase no válido" });
  }

  const nuevaClase = req.body;

  const { error } = validateClass(nuevaClase);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const claseExistente = await Class.findById(claseId);

    if (!claseExistente) {
      return res.status(404).json({
        message: "La clase no se encontró.",
        error: "La clase no existe",
      });
    }
    // Verificar si hay estudiantes inscritos en la clase
    if (claseExistente.students.length > 0) {
      return res.status(400).json({
        error: "No se puede cambiar la clase cuando hay clientes inscritos.",
      });
    }

    const claseActualizada = await Class.findByIdAndUpdate(
      claseId,
      { $set: nuevaClase },
      { new: true } // Para devolver el documento actualizado en lugar del original
    );

    if (!claseActualizada) {
      return res.status(500).json({
        message: "No se pudo actualizar la clase.",
        error: "No se pudo realizar la actualización",
      });
    }

    res.status(200).json({
      message: "Clase actualizada exitosamente.",
    });
  } catch (error) {
    console.error("Error al actualizar clase en MongoDB:", error);
    res.status(500).json({ error: "Error al actualizar clase en MongoDB" });
  }
});

// Ruta para eliminar una clase por su ID
router.delete("/:id", async (req, res) => {
  const claseId = req.params.id;

  try {
    const resultado = await Class.deleteOne({ _id: claseId }); // Eliminamos la clase por su ID
    if (resultado.deletedCount === 1) {
      res.status(200).json({ message: "Clase eliminada exitosamente." });
    } else {
      console.error("No se pudo encontrar la clase para eliminar.");
      res.status(404).json({ error: "Clase no encontrada." });
    }
  } catch (error) {
    console.error("Error al eliminar clase en MongoDB:", error);
    res.status(500).json({ error: "Error al eliminar clase en MongoDB" });
  }
});

// router.post("/reserveAsClient", async (req, res) => {
//   const { userId, classId } = req.body;

//   try {
//     // Buscar el usuario por su ID
//     const user = await User.findById(userId);

//     // Verificar si se encontró el usuario
//     if (!user) {
//       return res.status(404).json({ error: "Usuario no encontrado" });
//     }

//     // Verificar si el usuario tiene créditos suficientes
//     if (user.creditos === 0) {
//       return res.status(400).json({ error: "Créditos insuficientes" });
//     }

//     // Buscar la clase por su ID
//     const clase = await Class.findById(classId);

//     // Verificar si se encontró la clase
//     if (!clase) {
//       return res.status(404).json({ error: "Clase no encontrada" });
//     }

//     // Verificar si el usuario ya está inscrito en la clase
//     if (clase.students.includes(userId)) {
//       return res
//         .status(400)
//         .json({ error: "Usuario ya inscrito en esta clase" });
//     }

//     // Verificar si hay cupos disponibles en la clase
//     if (clase.capacity <= 0) {
//       return res.status(400).json({ error: "No hay cupos disponibles" });
//     }

//     // Restar 1 al campo de créditos del usuario
//     user.creditos -= 1;

//     // Restar 1 al campo de capacity de la clase
//     clase.capacity -= 1;

//     // Agregar el ID del usuario a la lista de estudiantes de la clase
//     clase.students.push(userId);

//     // Guardar los cambios en la base de datos
//     await Promise.all([user.save(), clase.save()]);

//     res.status(200).json({ message: "Clase reservada exitosamente" });
//   } catch (error) {
//     console.error("Error al procesar la reserva:", error);
//     res.status(500).json({ error: "Error al procesar la reserva" });
//   }
// });

// Ruta para reservar una clase
router.post("/reserveAsClient", async (req, res) => {
  const { userId, classId } = req.body;

  try {
    // Obtener la clase y el usuario
    const currentClass = await Class.findById(classId);
    const user = await User.findById(userId);

    if (!currentClass || !user) {
      return res
        .status(404)
        .json({ error: "La clase o el usuario no existen" });
    }

    if (currentClass.students.includes(userId)) {
      return res.status(400).json({ error: "Ya estás inscrito en esta clase" });
    }

    const serviceId = currentClass.service.toString(); // El ID del servicio de la clase

    // Revisar los planes del usuario
    let isReservationPossible = false;
    let remainingCredits = 0;

    for (let plan of user.plans) {
      for (let service of plan.plan.services) {
        if (service.service.toString() === serviceId && service.credits > 0) {
          // Restar un crédito y actualizar
          service.credits -= 1;
          remainingCredits = service.credits; // Guardar los créditos restantes
          planName = plan.plan.name; // Almacenar el nombre del plan donde se encontraron los créditos
          await user.save();
          isReservationPossible = true;
          break;
        }
      }
      if (isReservationPossible) break;
    }

    if (!isReservationPossible) {
      return res
        .status(400)
        .json({ error: "No tienes créditos disponibles para este servicio" });
    }

    // Añadir el estudiante a la clase y guardar
    currentClass.students.push(userId);
    await currentClass.save();

    res.json({
      message: `Clase reservada correctamente. Créditos restantes para el plan (${planName}): ${remainingCredits}`,
    });
  } catch (error) {
    console.error("Error al reservar la clase:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
