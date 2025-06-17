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

export default app