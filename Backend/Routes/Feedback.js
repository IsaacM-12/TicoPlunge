const router = require("express").Router();

const { Feedback, validateFeedback } = require("../Models/FeedbackModel");

// Ruta para obtener todos los comentarios
router.get("/", async (req, res) => {
  try {
    const comentarios = await Feedback.find(); // Obtenemos todos los comentarios
    res.json(comentarios); // Devolvemos los comentarios como JSON
  } catch (error) {
    console.error("Error al consultar comentarios en MongoDB:", error);
    res
      .status(500)
      .json({ error: "Error al consultar comentarios en MongoDB" });
  }
});

// Ruta para agregar un nuevo comentario
router.post("/", async (req, res) => {
  // Extraemos los datos del comentario del cuerpo de la solicitud
  const comentario = req.body;

  // Validar el comentario utilizando Joi
  const { error } = validateFeedback(comentario);
  if (error) {
    // Si hay errores de validación, devolver un error 400 con los detalles del error
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    // Verificar si ya existe un comentario con el mismo contenido
    const comentarioExistente = await Feedback.findOne(comentario);

    // Si ya existe, devolver un mensaje indicando que el comentario ya existe
    if (comentarioExistente) {
      return res.status(400).json({
        message: "El comentario ya existe.",
        error: "El comentario ya existe",
      });
    }

    // Si no existe, crear un nuevo comentario
    const nuevoComentario = await Feedback.create(comentario);

    // Devolver una respuesta exitosa con el nuevo comentario creado
    res.status(201).json({
      message: "Comentario agregado exitosamente.",
      comentario: nuevoComentario,
    });
  } catch (error) {
    console.error("Error al agregar comentario en MongoDB:", error);
    res.status(500).json({ error: "Error al agregar comentario en MongoDB" });
  }
});

// Ruta para actualizar un comentario existente
router.put("/:id", async (req, res) => {
  // Extraer el ID del comentario de los parámetros de la solicitud
  const comentarioId = req.params.id;

  // Extraer los nuevos datos del comentario del cuerpo de la solicitud
  const nuevoComentario = req.body;

  // Validar el comentario utilizando Joi
  const { error } = validateFeedback(nuevoComentario);
  if (error) {
    // Si hay errores de validación, devolver un error 400 con los detalles del error
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    // Verificar si existe el comentario que se intenta actualizar
    const comentarioExistente = await Feedback.findById(comentarioId);

    // Si el comentario no existe, devolver un mensaje indicando que no se puede encontrar
    if (!comentarioExistente) {
      return res.status(404).json({
        message: "El comentario no se encontró.",
        error: "El comentario no existe",
      });
    }

    // Actualizar el comentario existente con los nuevos datos
    const comentarioActualizado = await Feedback.findByIdAndUpdate(
      comentarioId,
      nuevoComentario,
      { new: true } // Para devolver el documento actualizado en lugar del original
    );

    // Devolver una respuesta exitosa con el comentario actualizado
    res.status(200).json({
      message: "Comentario actualizado exitosamente.",
      comentario: comentarioActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar comentario en MongoDB:", error);
    res
      .status(500)
      .json({ error: "Error al actualizar comentario en MongoDB" });
  }
});

// Ruta para eliminar un comentario por su ID
router.delete("/:id", async (req, res) => {
  const comentarioId = req.params.id;

  try {
    const resultado = await Feedback.deleteOne({ _id: comentarioId }); // Eliminamos el comentario por su ID
    if (resultado.deletedCount === 1) {
      res.status(200).json({ message: "Comentario eliminado exitosamente." });
    } else {
      console.error("No se pudo encontrar el comentario para eliminar.");
      res.status(404).json({ error: "Comentario no encontrado." });
    }
  } catch (error) {
    console.error("Error al eliminar comentario en MongoDB:", error);
    res.status(500).json({ error: "Error al eliminar comentario en MongoDB" });
  }
});

module.exports = router;
