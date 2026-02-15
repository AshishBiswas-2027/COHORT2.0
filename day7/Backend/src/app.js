//server banana 
const express = require('express')
const noteModel = require('./models/note.model')
const cors = require ('cors')

const app = express()
app.use (cors())
app.use(express.json())
app.use(express.static("./public"))// js aur css files ko html se open karne k liye

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

app.use("*name", (req, res) => {
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports = app