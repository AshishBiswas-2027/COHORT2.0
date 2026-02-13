//server banana aur config karna



const express = require('express');
const model = require('./models/notes.model');
const noteModel = require('./models/notes.model');

const app = express();

app.use(express.json())

app.post('/notes', async (req, res) => {
    
    const { title, description } = req.body;
    const note = await noteModel.create({
        title,description
    })

    res.status(201).send({
        message: "note created successfully",
        note 
    })
})

module.exports = app;