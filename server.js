require('dotenv').config()

const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')


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

    // Sign up
    app.post('/signup', async (req, res) => {
        try {
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            db.query(
                "INSERT INTO users(email, password) VALUES(?, ?)", 
                [req.body.email, hashedPassword],
                function(err, result) {
                    if (err) throw err
    
                    res.json({token: result.insertId})
                }
            )
        } catch {
            // In case something goes wrong with the password hashing
            res.status(500).send()
        }

        
    }) 

    // To check if user is in the database or not
    app.get('/checkUser/:token', (req, res) => {
        const token = req.params.token

        db.query(
            "SELECT email FROM users WHERE id=?",
            [token],
            function(err, result, fields) {
                if (err) throw err
                
                if (result.length === 0) {
                    res.json({response: null})
                } else {
                    res.json({response: result[0]})
                }
            }
        )
    })

    // To log user in
    app.post('/login', (req, res) => {
        db.query(
            'SELECT id, password FROM users WHERE email=?',
            [req.body.email],
            async function(err, result, fields) {
                if (err) throw err

                if (result.length === 0) {
                    // If nothing corresponds to the email given to the query
                    res.json({response: null})
                } else {
                    try {
                        if (await bcrypt.compare(req.body.password, result[0].password)) {
                            res.json({response: result[0].id})  
                        } else {
                            // If the password given to bcrypt.compare() doesn't match the 
                            // password stored in the database
                            res.json({response: null})
                        }
                    } catch {
                        // In case something goes wrong with the password check
                        res.status(500).send()
                    }
                }  
            }
        )
    })

    // To save a meal with its nutritional values in the database
    app.post('/saveMeal', (req, res) => {
        db.query(
            'INSERT INTO meal_user(user_id) VALUES(?)',
            [req.body.userId],
            function(err, result, fields) {
                if (err) throw err

                const mealId = result.insertId

                db.query(
                    'INSERT INTO meal_values(calories, protein, carbs, sugar, fat, saturatedFat, fiber, meal_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        req.body.calories,
                        req.body.protein,
                        req.body.carbs,
                        req.body.sugar,
                        req.body.fat,
                        req.body.saturatedFat,
                        req.body.fiber,
                        mealId
                    ],
                    function(err, result, fields) {
                        if (err) throw err

                        req.body.mealFoods.forEach(food => {
                            db.query(
                                'INSERT INTO meal_foods(name, quantity, meal_id) VALUES(?, ?, ?)',
                                [
                                    food.name,
                                    food.quantity,
                                    mealId
                                ],
                                function(err, result, fields) {
                                    if (err) throw err
                                }
                            )
                        })

                        res.json({response: 'OK'})
                    }
                )
            }
        )
    })

    // To retrieve all the meals and their respective nutritional values for a given user
    app.get('/getMeals/:token', (req, res) => {
        const token = req.params.token

        db.query(
            'SELECT * FROM meal_user JOIN meal_foods ON meal_user.id=meal_foods.meal_id JOIN meal_values ON meal_user.id=meal_values.meal_id WHERE user_id=?',
            [token],
            function(err, result, fields) {
                if (err) throw err

                const mealIds = []
                const meals = []
                const data = []

                // Retrieves each meal_id and puts them in an array
                result.forEach(item => {
                    const mealId = item.meal_id

                    if (!mealIds.includes(mealId)) {
                        mealIds.push(mealId)
                    }
                })

                // Groups items of 'result' array by meal_id 
                mealIds.forEach(id => {
                    let counter = 1
                    let currentMeal = {}

                    result.forEach(item => {
                        if (item.meal_id === id) {
                            currentMeal[counter] = item
                            counter++
                        }
                    })

                    meals.push(currentMeal)
                })

                // Sorts out any redundancy -> final data that will be sent to frontend 
                meals.forEach(meal => {
                    let currentMeal = {}
                    let foods = []

                    currentMeal['key'] = meal[1].meal_id

                    currentMeal['values'] = [
                        meal[1].calories,
                        meal[1].protein,
                        meal[1].carbs,
                        meal[1].sugar,
                        meal[1].fat,
                        meal[1].saturatedFat,
                        meal[1].fiber 
                    ]

                    for (let item in meal) {
                        foods.push({'name': meal[item].name, 'quantity': meal[item].quantity}) 
                    }

                    currentMeal['foods'] = foods

                    data.push(currentMeal)
                })

                res.json({response: data})
            }
        )
    })

    // To remove info for a given meal from the database
    app.delete('/removeMeal/:mealId', (req, res) => {
        const mealId = req.params.mealId

        db.query(
            'DELETE FROM meal_user WHERE id=?',
            [mealId],
            function(err, result, fields) {
                if (err) throw err

                res.json({response: 'OK'})
            }
        )
    })

    app.listen(port, console.log(`Server started on port ${port}`))
}) 

