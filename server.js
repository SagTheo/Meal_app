const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const bodyParser = require('body-parser')

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
    host: 'localhost',
    user: 'root',
    password: 'webdev2022',
    database: 'meal_app'
})

db.connect(function(err) {
    if (err) throw err

    app.get('/', (req, res) => {
        console.log('Connected to React')

        db.query('SELECT *  FROM foods LIMIT 5', function(err, result, fields) {
            if (err) throw err

            res.json({data: result})
        })
        
    })
    
    app.get('/:food', (req, res) => {
        const food = req.params.food
        
        //CONCAT() function to search for possible matches in the databases given the user input
        db.query("SELECT * FROM foods WHERE name LIKE CONCAT('%', ?, '%')", [food], function(err, result, fields) {
            if (err) throw err

            res.json({data: result})
        })
    })

    app.post('/signup', (req, res) => {
        db.query(
            "INSERT INTO users(email, password) VALUES(?, ?)", 
            [req.body.email, req.body.password],
            function(err, result) {
                if (err) throw err

                res.json({token: result.insertId})
            }
        )
    }) 

    app.get('/dashboard/:token', (req, res) => {
        const token = req.params.token

        db.query(
            "SELECT email FROM users WHERE id=?",
            [token],
            function(err, result, fields) {
                if (err) throw err

                res.json({email: result})
            }
        )
    })

    app.listen(port, console.log(`Server started on port ${port}`))
}) 

