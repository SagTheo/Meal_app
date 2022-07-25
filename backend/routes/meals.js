const express = require('express')
const db = require('../dbConnection')

const router = express.Router()


// To save a meal with its nutritional values in the database
router.post('/saveMeal', (req, res) => {
    db.query(
        'INSERT INTO meal_user(user_id) VALUES(UUID_TO_BIN(?))',
        [JSON.parse(req.body.userId)],
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
router.get('/getMeals/:token', (req, res) => {
    const token = req.params.token

    db.query(
        'SELECT * FROM meal_user JOIN meal_foods ON meal_user.id=meal_foods.meal_id JOIN meal_values ON meal_user.id=meal_values.meal_id WHERE user_id=UUID_TO_BIN(?)',
        [JSON.parse(token)],
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
router.delete('/removeMeal/:mealId', (req, res) => {
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

module.exports = router