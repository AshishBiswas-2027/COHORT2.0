const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: String,
    description : String
})

const noteModel = mongoose.model("notes", noteSchema)//notes model k andar collection ka naam hai

module.exports = noteModel;