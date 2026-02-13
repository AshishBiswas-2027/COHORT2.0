//server banana 
const express = require('express')
const noteModel = require('./models/note.model')

const app = express()
app.use(express.json())

app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body;
    const notes = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "note created successfully",
        notes
    })
})


app.get('/api/notes', async (req, res) => {
    const notes = await noteModel.find()
    res.status(200).json({
        message:"notes fetched successfully",
        notes
    })

})

app.delete('/api/notes/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted successfully"
    })
})

app.patch('/api/notes/:id', async (req, res) => {
    const { description } = req.body
    const id = req.params.id

    await noteModel.findByIdAndUpdate(id, { description })
    
    res.status(200).json({
        message:"Description updated successfully"
    })
    
})
module.exports = app