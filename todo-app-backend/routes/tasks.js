const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// @route   GET /api/tasks
// @desc    Get all tasks
// @access  Public

router.get('/', async (req,res) => {
    try{
        const tasks = await Task.find().sort({createdAt : -1});
        res.json(tasks); 
    }
    catch(err){
        res.status(500).json({ error : 'server error'});
    }
});

// @route   GET /api/tasks/:id
// @desc    Get a single task by ID
// @access  Public

router.get('/:id', async (req,res) => {
    try{
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({error : 'Task not found'});
        res.json(task);
    }
    catch(err){
        res.status(500).json({ error : 'server error'});
    }
});

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Public

router.post('/', async (req,res) =>{
    const {title, description} = req.body;

    if(!title){
        return res.status(400).json({ error: 'Title is required' });
    }

    try{
        const newTask = new Task({
            title,
            description,
        })

        const task = await newTask.save();
        res.status(201).json(task);
    }
    catch(err){
        res.status(500).json({error: 'Server Error'});
    }
})

// @route   PUT /api/tasks/:id
// @desc    Update a task by ID
// @access  Public

router.put('/:id', async (req,res) =>{
    const {title, description, completed} = req.body;

    try{
        let task = await Task.findById(req.params.id);
        if(!task) return res.status(404).json({error : 'Task not Found'});

        if(title !== undefined) task.title = title;
        if(description !== undefined) task.description = description;
        if(completed !== undefined) task.completed = completed;

        task = await task.save();
        res.json(task);
    }
    catch(err){
        res.status(500).json({error : 'Server Error'});
    }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task by ID
// @access  Public
router.delete('/:id', async (req,res) =>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task) return res.status(404).json({error : 'Task not found'})

        res.json({message : 'Task removed Successfully'});
    }
    catch(err){
        res.status(500).json({error : 'Server Error'});
    }
});

module.exports = router;