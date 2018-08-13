
const gasto = deps => {
  return {
    allByEvento: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT * FROM gasto WHERE evento_id = ?', [id], (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar os gasto', reject)
            return false
          }
          resolve({ gastos: results })
        })
      })
    },
    save: (gasto, id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('INSERT INTO gasto ( evento_id, titulo, descricao, valor, data_gasto,  pago) VALUES (?,?,?,?,?,?)', [id, gasto.titulo, gasto.descricao, gasto.valor, gasto.data_gasto, gasto.pago], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao salvar o gasto ${gasto.titulo}`, reject)
            return false
          }
          resolve({ gasto: { titulo: gasto.titulo, id: results.insertId } })
        })
      })
    },
    update: (gasto, id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('UPDATE gasto SET titulo = ?, evento_id = ?, descricao = ?, valor = ?, data_gasto = ?, pago = ? WHERE id = ?', [gasto.titulo, gasto.evento_id, gasto.descricao, gasto.valor, gasto.data_gasto, gasto.pago, gasto.id], (error, results) => {
          if (error || !results.affectedRows) {
            console.log(error)
            errorHandler(error, `Falha ao atualizar o gasto ${gasto.titulo}`, reject)
            return false
          }
          resolve({ gasto: { titulo: gasto.titulo, id }, affectedRows: results.affectedRows })
        })
      })
    },
    del: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('DELETE FROM gasto WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover o gasto de id ${id}`, reject)
            return false
          }
          resolve({ message: 'Gasto removido com sucesso!', affectedRows: results.affectedRows })
        })
      })
    }
  }
}

module.exports = gasto
