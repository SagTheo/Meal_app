require('dotenv').config()

const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const bodyParser = require('body-parser')
const mealRoutes = require('./routes/meals')
const authRoutes = require('./routes/auth')

const app = express()

//To prevent CORS errors
app.use(cors({
    origin: 'http://localhost:3000'
}))

//Middleware that parses the body of the request
app.use(bodyParser.json())

const port = process.env.PORT || 3001

//Creates connection to database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'meal_app'
})

db.connect(function(err) {
    if (err) throw err

    // Quick search
    app.get('/', (req, res) => {
        db.query('SELECT *  FROM foods LIMIT 5', function(err, result, fields) {
            if (err) throw err

            res.json({data: result})
        })
        
    })
    
    // Food search
    app.get('/:food', (req, res) => {
        const food = req.params.food
        
        //CONCAT() function to search for possible matches in the database given the user input
        db.query("SELECT * FROM foods WHERE name LIKE CONCAT('%', ?, '%')", [food], function(err, result, fields) {
            if (err) throw err

            res.json({data: result})
        })
    })

    // Log in, sign up, check user
    app.use('/auth', authRoutes)

    // Save, get, remove meals
    app.use('/meals', mealRoutes)

    app.listen(port, console.log(`Server started on port ${port}`))
}) 