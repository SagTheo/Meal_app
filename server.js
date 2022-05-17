const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()

//To prevent CORS errors
app.use(cors({
    origin: 'http://localhost:3000'
}))

const port = process.env.PORT || 3001

//Creates connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'webdev2022',
    database: 'meal_app'
})

db.connect(function(err) {
    if (err) console.log(err)

    app.get('/', (req, res) => {
        console.log('Connected to React')

        db.query('SELECT *  FROM foods LIMIT 5', function(err, result, fields) {
            if (err) console.log(err)

            res.json({data: result})
        })
        
    })
    
    app.get('/:food', (req, res) => {
        const food = req.params.food

        db.query('SELECT * FROM foods WHERE name= ?', [food], function(err, result, fields) {
            if (err) console.log(err)

            res.json({data: result})
        })
    })

    app.listen(port, console.log(`Server started on port ${port}`))
}) 

