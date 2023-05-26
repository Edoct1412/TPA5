const express = require('express');
const app = express();
const port = 3000;

const TodoModel = require('./models').Todo;

app.get('/', (req, res) => {
  res.send('Selamat datang di halaman beranda!');
});

app.get('/todos', async function (req, res) {
    try {
        const todos = await TodoModel.findAll();

        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({
            message: error.message || 'internal server error',
        });
    }
})

app.get('/todos/:todoId', async function (req, res) {
    try {
        const {todoId} = req.params;
        const todo = await TodoModel.findOne({ id: Number(todoId) });

        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({
            message: error.message || 'internal server error',
        });
    }
})

app.post('/todos', async function (req, res) {
    try {
        const {title, description, startTime} = req.body;

        const newTodoData = {
            title: title,
            description: description,
            startTime: startTime,
            status: 'false',
        };

        const newTodo = await TodoModel.create(newTodoData);

        res.status(201).json({
            message: 'new todo created',
            todo: newTodo,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'internal server error',
        });
    }
})

app.patch('/todos/:todoId', async function (req, res) {
    try {
        const {todoId} = req.params;
        const {title, description, startTime, status} = req.body;

        const updateTodoData = {
            title: title,
            description: description,
            startTime: startTime,
            status: 'false',
        };

        const updateTodo = await TodoModel.update(updateTodoData, {
            where : {
                id: todoId
            }
        });

        res.status(202).json({
            message: 'update todo success'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'internal server error',
        });
    }
})

app.delete('/todos/:todoId', async function (req, res) {
    try {
        const {todoId} = req.params;

        await TodoModel.destroy({
            where : {
                id: todoId
            }
        });

        res.status(200).json({
            message: 'delete todo success'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'internal server error',
        });
    }
})