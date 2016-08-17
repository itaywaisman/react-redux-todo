import { Router } from 'express';
import * as TodoController from '../controllers/todo.controller.js'

const router = new Router();

router.route('/')
  .get(TodoController.getTodos)
  .post(TodoController.addTodo);

router.route('/:cuid')
  .get(TodoController.getTodo)
  .put(TodoController.updateTodo)
  .delete(TodoController.deleteTodo);

  export default router;
