const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//File Imports
const Todo = require('./models/Todo');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/mern-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log("connected to DB"))
.catch(console.error);

// Get routes
app.get('/todos', async (req, res)=>{
    const todos = await Todo.find();

    res.json(todos);
});

app.get('/todo/complete/:id', async(req, res)=>{
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
})

//Post routes
app.post('/todo/new',  (req, res)=>{
    const todo = new Todo({
        text: req.body.text
    })
    todo.save();
    res.json(todo);
});

//Delete route
app.delete('/todo/delete/:id', async(req, res)=>{
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
});




app.listen(3001, ()=> console.log("server started on port 3001"));