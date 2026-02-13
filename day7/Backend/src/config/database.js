const mongoose = require('mongoose')



function connectToDb() {

    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('Successfully connected to database')
    })



}

module.exports = connectToDb