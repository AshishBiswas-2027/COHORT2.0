//server create karna aur config karne k liye 
const express = require('express');

let notes = []

const app = express();// server yahi create ho jata hai 
app.use(express.json())

app.post('/notes', (req, res) => {
    console.log(req.body);

    notes.push(req.body);

    console.log(notes);

    res.send("notes created");
})



app.get('/notes', (req, res) => {
    res.send('hello world');
})

app.delete('/notes/:index', (req, res) => {// : colon k baad jo part aata hai wo params(dynamic) hota hai data bhej sakte hai uske through 
    console.log(req.params.index);

    res.send ('note deleted successfully')
})


app.patch('/notes/:index', (req, res) => {

    notes[req.params.index].description = req.body.description;

    res.send("description  updated");
    console.log(notes)
    
})

module.exports = app;//bana hua server ko dusre file me bhej rahe hai start karne k liye 