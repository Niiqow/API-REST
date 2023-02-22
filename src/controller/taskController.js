const Task = require('../models/task');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.getAllTasks(req.app.get('db'));
    console.log(tasks);
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error al obtener las tareas: ${error.message}` });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.getTaskById(req.app.get('db'), id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'La tarea no fue encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: `Error al obtener la tarea: ${error.message}` });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { nota, estado } = req.body;
    const task = await Task.createTask(req.app.get('db'), nota, estado);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: `Error al crear la tarea: ${error.message}` });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { nota, estado } = req.body;
    const task = await Task.updateTask(req.app.get('db'), id, nota, estado);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'La tarea no fue encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: `Error al actualizar la tarea: ${error.message}` });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.deleteTask(req.app.get('db'), id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'La tarea no fue encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: `Error al eliminar la tarea: ${error.message}` });
  }
};

/*
getAllTasks: maneja la solicitud GET /tasks para obtener todas las tareas.
getTaskById: maneja la solicitud GET /tasks/:id para obtener una tarea específica por su id.
createTask: maneja la solicitud POST /tasks para crear una nueva tarea.
updateTask: maneja la solicitud PUT /tasks/:id para actualizar una tarea existente.
deleteTask: maneja la solicitud `DELETE /
*/