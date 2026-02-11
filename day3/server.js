const express = require('express');
const app = express();

app.use(express.json())//iske bagair req.body ka data server noramlly nahi padh sakta hai, //it is a middleware

const notes = [];

app.post('/post', (req, res) => {

    console.log(req.body)

    notes.push(req.body)

    res.send('note created')
})

app.get('/post', (req, res) => {
    
    res.send(notes)
})

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
