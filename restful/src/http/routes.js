
const db = require('../services/mysql')

const routes = (server) => {
  /*server.post('autenticacao', async (req, res, next) => {
    try {
      const { email, password } = req.params
      res.send(await db.auth().authenticate(email, password))
    } catch (error) {
      res.send(error)
    }
    next()
  })*/
  server.get('/getbyemail/:email', async (req, res, next) => {
    try {
      res.send(await db.users().getByEmail(req.params.email))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.get('user/all', async (req, res, next) => {
    try {
      res.send(await db.users().all())
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.get('/getuserbyemail/:email', async (req, res, next) => {
    let email = req.params.email
    try {
      res.send(await db.users().getUserByEmail(email))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.post('usuario', async (req, res, next) => {
    const user = req.body
    try {
      res.send(await db.users().save(user))
    } catch (error) {
      console.log(error)
      res.send(error)
    }
    next()
  })

  server.get('evento/all', async (req, res, next) => {
    try {
      res.send(await db.evento().all())
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.get('/geteventbyuserid/:id', async (req, res, next) => {
    try {
      res.send(await db.evento().allByUser(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.post('evento', async (req, res, next) => {
    const evento = req.body
    try {
      res.send(await db.evento().save(evento.evento, evento.id))
    } catch (error) {
      console.log(error)
      res.send(error)
    }
    next()
  })

  server.put('evento', async (req, res, next) => {
    const evento = req.body
    console.log(evento)
    try {
      res.send(await db.evento().update(evento.evento, evento.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.del('/evento/:id', async (req, res, next) => {
    try {
      res.send(await db.evento().del(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.get('/gastobyeventoid/:id', async (req, res, next) => {
    try {
      res.send(await db.gasto().allByEvento(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.post('gasto', async (req, res, next) => {
    const gasto = req.body
    try {
      res.send(await db.gasto().save(gasto.gasto, gasto.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.put('gasto', async (req, res, next) => {
    const gasto = req.body
    console.log(gasto)
    try {
      res.send(await db.gasto().update(gasto.gasto, gasto.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.del('gasto/:id', async (req, res, next) => {
    try {
      res.send(await db.gasto().del(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })
}

module.exports = routes
