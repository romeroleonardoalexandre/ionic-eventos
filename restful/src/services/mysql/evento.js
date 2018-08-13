
const evento = deps => {
  return {
    allByUser: (userId) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT * FROM evento WHERE usuario_id = ?', [userId], (error, results) => {
          if (error) {
            errorHandler(error, error, reject)
            return false
          }
          resolve({ eventos: results })
        })
      })
    },
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT * FROM evento', (error, results) => {
          if (error) {
            console.log(error)
            errorHandler(error, 'Falha ao listar os evento', reject)
            return false
          }
          resolve({ eventos: results })
        })
      })
    },
    save: (evento, id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('INSERT INTO evento (titulo, usuario_id, descricao, data_evento, realizado) VALUES (?,?,?,?,?)', [evento.titulo, id, evento.descricao, evento.data_evento, evento.realizado], (error, results) => {
          if (error) {
            console.log(error)
            errorHandler(error, `Falha ao salvar o evento ${evento.titulo}`, reject)
            return false
          }
          resolve({ evento: { titulo: evento.titulo, id: results.insertId } })
        })
      })
    },
    update: (evento, id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('UPDATE evento SET titulo = ?, usuario_id = ?, descricao = ?, data_evento = ?, realizado = ? WHERE id = ?', [evento.titulo, id, evento.descricao, evento.data_evento, evento.realizado, evento.id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao atualizar o evento ${evento.titulo}`, reject)
            return false
          }
          resolve({ evento: { titulo: evento.titulo }, affectedRows: results.affectedRows })
        })
      })
    },
    del: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('DELETE FROM evento WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover o evento de id ${id}`, reject)
            return false
          }
          resolve({ message: 'Evento removido com sucesso!', affectedRows: results.affectedRows })
        })
      })
    },
    getById: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT * FROM evento WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao pegar o evento de id ${id}`, reject)
            return false
          }
          resolve({ evento: results.all, affectedRows: results.affectedRows })
        })
      })
    }
  }
}

module.exports = evento
