//server start karna aur database se connect karna


require('dotenv').config()
const app = require('./src/app');

const mongoose = require('mongoose')

const connectToDB = require('./src/config/database')

connectToDB()

app.listen(3000, () => {
    console.log('server has started on port 3000');
})