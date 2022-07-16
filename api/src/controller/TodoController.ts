import { components } from '@/specs/request_response_schema';
import { PrismaClient, Todo } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'

export type GetTodosResponse = components['responses']['GetTodosResponse']['content']['application/json'];
export type GetTodoResponse = components['responses']['GetTodoResponse']['content']['application/json'];
export type CreateTodoResponse = components['responses']['CreateTodoResponse']['content']['application/json'];
export type UpdateTodoResponse = components['responses']['UpdateTodoResponse']['content']['application/json'];

const prisma = new PrismaClient()

export class TodoController {
  public async getAll (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const responseData: Todo[] = await prisma.todo.findMany()
      const response: GetTodosResponse = responseData.map((data: Todo) => {
        return {
          id: data.id,
          title: data.title,
          content: data.content,
          is_done: data.isDone,
          created_at: data.createdAt.toLocaleString(),
          updated_at: data.updatedAt.toLocaleTimeString(),
        }
      })
      res.json(response)
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
      if (!responseData) {
        res.status(404).end()
        return;
      }
      const response: GetTodoResponse = {
        id: responseData.id,
        title: responseData.title,
        content: responseData.content,
        is_done: responseData.isDone,
        created_at: String(responseData.createdAt),
        updated_at: String(responseData.updatedAt),
      }
      res.json(response)
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
      const response: CreateTodoResponse = {
        id: responseData.id,
        title: responseData.title,
        content: responseData.content,
        is_done: responseData.isDone,
        created_at: String(responseData.createdAt),
        updated_at: String(responseData.updatedAt),
      }
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  public async put (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: number = +req.params.id
      const entity: Todo | null = await prisma.todo.findUnique({
        where: { id: id },
      })
      if (!entity) {
        res.status(404).end()
        return;
      }
      const { title, content, is_done } = req.body
      const responseData: Todo = await prisma.todo.update({
        where: { id: id },
        data: {
          title: title,
          content: content,
          isDone: is_done,
        },
      })
      const response: UpdateTodoResponse = {
        id: responseData.id,
        title: responseData.title,
        content: responseData.content,
        is_done: responseData.isDone,
        created_at: String(responseData.createdAt),
        updated_at: String(responseData.updatedAt),
      }
      res.json(response)
    } catch (err) {
      next(err)
    }
  }

  public async delete (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: number = +req.params.id
      const entity: Todo | null = await prisma.todo.findUnique({
        where: { id: id },
      })
      if (!entity) {
        res.status(404).end()
        return;
      }
      const responseData: Todo = await prisma.todo.delete({
        where: { id: id },
      })
      responseData ? res.status(200).end() : res.status(404).end()
    } catch (err) {
      next(err)
    }
  }
}