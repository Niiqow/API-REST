class Task {
  static async getAllTasks(pool) {
    const { rows } = await pool.query('SELECT * FROM task')
    return rows
  }

  static async getTaskById(pool, id) {
    const { rows } = await pool.query('SELECT * FROM task WHERE id = $1', [id])
    return rows[0]
  }

  static async createTask(pool, nota, estado) {
    const { rows } = await pool.query('INSERT INTO task (nota, estado) VALUES ($1, $2) RETURNING *', [nota, estado])
    return rows[0]
  }

  static async updateTask(pool, id, nota, estado) {
    const { rows } = await pool.query('UPDATE task SET nota = $1, estado = $2 WHERE id = $3 RETURNING *', [nota, estado, id])
    return rows[0]
  }

  static async deleteTask(pool, id) {
    const { rows } = await pool.query('DELETE FROM task WHERE id = $1 RETURNING *', [id])
    return rows[0]
  }
}

module.exports = Task

/*
getAllTasks: devuelve un arreglo con todos los registros de la tabla task.
getTaskById: devuelve un objeto con los datos del registro de la tabla task con el id especificado.
createTask: crea un nuevo registro en la tabla task con los datos especificados y devuelve un objeto con los datos del registro creado, incluyendo el id asignado por la base de datos.
updateTask: actualiza un registro existente en la tabla task con los datos especificados y devuelve un objeto con los datos del registro actualizado.
deleteTask: elimina un registro existente en la tabla task con el id especificado y devuelve un objeto con los datos del registro eliminado.
*/