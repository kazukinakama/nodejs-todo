import express from 'express'
import * as OpenApiValidator from 'express-openapi-validator'

const app = express()
const port = process.env.PORT || 80
const prefix = '/api'

app.use(express.json())
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Authorization,Content-Type'
    )
    next()
  }
)

app.get(prefix, (req, res) => res.send('Hello World!'))

app.use(
  OpenApiValidator.middleware({
    apiSpec: '../specs/merged_api.yml',
    validateRequests: true,
    validateResponses: true,
  }),
)

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.status === 404 || err.message === 'Bad Request') {
    res.status(400).json({ message: 'Bad Request' })
    return
  } else if (err.status === 401) {
    res.status(401).json({ message: err.message })
    return
  } else if (err.status === 404) {
    res.status(404).json({ message: 'Not Found' })
    return
  }
  res.status(500).json({ message: 'Internal Server Error' })
})

app.listen(port, () => console.log(`Server is running on port ${port}`))
