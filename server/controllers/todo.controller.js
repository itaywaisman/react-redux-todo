import Todo from '../model/todo.js'
import sanitizeHtml from 'sanitize-html';

export function getTodos(req, res) {
  Todo.find().sort('-creationTime').exec((err, todos) => {
    if (err) {
      res.status(500).send(err);
    }

    res.json({ todos });
  });
}

export function getTodo(req, res) {
  Todo.findOne({ cuid: req.params.cuid }).exec((err, todo) => {
    if (err) {
      res.status(500).send(err);
    }

    res.json({ todo });
  });
}

export function addTodo(req, res) {
  const newTodo = new Todo(req.body.todo);

  newTodo.title = sanitizeHtml(newTodo.title)

  newTodo.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }

    res.json(saved);
  })

}

export function updateTodo(req, res) {
  if(req.body.todo.title)
    req.body.todo.title = sanitizeHtml(req.body.todo.title);

  Todo.findOneAndUpdate({ cuid: req.params.cuid }, req.body.todo, (err, todo) => {
    if (err) {
      res.status(500).send(err);
    }
    if (!todo) {
      res.status(304).end();
    }

    return res.json(todo);

  });
}

export function deleteTodo(req, res) {
  Todo.findOne({ cuid: req.params.cuid }).exec((err, todo) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    if (todo) {
      todo.remove(() => {
        res.status(200).send(todo);
      })
    }

  });
}
