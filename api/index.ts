import { Hono } from 'hono'

type Bindings = {
  ASSETS: Fetcher
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/api/eshops', async (c) => {
  let { results } = await c.env.DB.prepare("SELECT * FROM eshops").all()
  return c.json(results)
})

app.post('/api/eshops', async (c) => {
  const newId = crypto.randomUUID()
  const input = await c.req.json<any>()
  const query = `INSERT INTO eshops(id,name,place,time) values ("${newId}","${input.name}","${input.place}",${input.time})`
  const newEshop = await c.env.DB.exec(query)
  return c.json(newEshop)
})

app.get('/api/eshops/:id', async (c) => {
  const eshopId = c.req.param('id')
  let { results } = await c.env.DB.prepare('SELECT * FROM eshops WHERE id = ?').bind(eshopId).all()
  return c.json(results[0])
})

app.put('/api/eshops/:id', async (c) => {
  const eshopId = c.req.param('id')

  const input = await c.req.json<any>()
  const query = `UPDATE eshops SET name = "${input.name}", place = "${input.place}", time = ${input.time} WHERE id = "${eshopId}"`
  const eshop = await c.env.DB.exec(query)

  return c.json(eshop)
})

app.delete('/api/eshops/:id', async (c) => {
  const eshopId = c.req.param('id')

  const query = `DELETE FROM eshops WHERE id = "${eshopId}"`
  const eshop = await c.env.DB.exec(query)

  return c.json(eshop)
})

app.get('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app