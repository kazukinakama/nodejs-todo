import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import * as OpenApiValidator from 'express-openapi-validator'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import path from 'path'
import { TodoController } from './controller/TodoController'

const app = express()
const port = process.env.PORT || 80
const prefix = '/api'

app.use(express.json())
app.use(
  (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Authorization,Content-Type',
    )
    next()
  },
)

app.get(prefix + '/check', (req: Request, res: Response) => res.send('Hello World!'))

app.use(
  OpenApiValidator.middleware({
    apiSpec: path.join(__dirname, '../specs/merged_api.yml'),
    validateRequests: true,
    validateResponses: true,
  }),
)

// todos
{
  const todoController: TodoController = new TodoController

  app.route(prefix + '/todos')
    .get((req: Request, res: Response, next: NextFunction) => todoController.getAll(req, res, next))
    .post((req: Request, res: Response, next: NextFunction) => todoController.post(req, res, next))
  app.route(prefix + '/todos/:id')
    .get((req: Request, res: Response, next: NextFunction) => todoController.get(req, res, next))
    .put((req: Request, res: Response, next: NextFunction) => todoController.put(req, res, next))
    .delete((req: Request, res: Response, next: NextFunction) => todoController.delete(req, res, next))
}

const errorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  if (res.headersSent) {
    return next(err)
  }
  console.error(err.message);
  if (err.status === StatusCodes.BAD_REQUEST || err.message === ReasonPhrases.BAD_REQUEST) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST })
    return
  } else if (err.status === StatusCodes.UNAUTHORIZED) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message })
    return
  } else if (err.status === StatusCodes.NOT_FOUND) {
    res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND })
    return
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
}
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port ${port}`))
