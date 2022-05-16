const express = require('express')
const mysql = require('mysql2')

const app = express()

const port = process.env.PORT || 3001

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'webdev2022',
    database: 'meal_app'
})

// db.connect(function(err) {
//     if (err) console.log(err)
    
//     db.query('SELECT name FROM foods', function(err, result, fields) {
//         if (err) console.log(err)

//         app.get('/', (req, res) => {
//             res.json(result)
//         })
//     })

//     app.listen(3000)
// }) 

app.get('/', (req, res) => {
    res.json({message: 'Server message'})
})

app.listen(port)
