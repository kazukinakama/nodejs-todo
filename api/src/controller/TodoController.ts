import { PrismaClient, Todo } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'

const prisma = new PrismaClient()

export class TodoController {
  public async getAll (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const responseData: Todo[] = await prisma.todo.findMany()
      res.json(responseData)
    } catch (err) {
      next(err)
    }
  }

  public async get (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: number = +req.params.id
      const responseData: Todo | null = await prisma.todo.findUnique({
        where: { id: id },
      })
      res.json(responseData ?? {})
    } catch (err) {
      next(err)
    }
  }

  public async post (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, content, is_done } = req.body
      const responseData: Todo = await prisma.todo.create({
        data: {
          title: title,
          content: content,
          isDone: is_done,
        },
      })
      res.json(responseData)
    } catch (err) {
      next(err)
    }
  }

  public async put (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: number = +req.params.id
      const { title, content, is_done } = req.body
      const responseData: Todo = await prisma.todo.update({
        where: { id: id },
        data: {
          title: title,
          content: content,
          isDone: is_done,
        },
      })
      res.json(responseData)
    } catch (err) {
      next(err)
    }
  }

  public async delete (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: number = +req.params.id
      const responseData: Todo = await prisma.todo.delete({
        where: { id: id },
      })
      responseData ? res.status(200).end() : res.status(404).end()
    } catch (err) {
      next(err)
    }
  }
}