const express = require('express')
const router = express.Router()
const taskController = require('../controller/taskController')

router.get('/tasks', taskController.getAllTasks)
router.get('/tasks/:id', taskController.getTaskById)
router.post('/tasks', taskController.createTask)
router.put('/tasks/:id', taskController.updateTask)
router.delete('/tasks/:id', taskController.deleteTask)

module.exports = router

/* 
GET /tasks: obtiene todas las tareas.
GET /tasks/:id: obtiene una tarea específica por su id.
POST /tasks: crea una nueva tarea.
PUT /tasks/:id: actualiza una tarea existente.
DELETE /tasks/:id: elimina una tarea.

*/