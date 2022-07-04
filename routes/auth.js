require('dotenv').config()

const express = require('express')
const bcrypt = require('bcrypt')
const mysql = require('mysql2')

const router = express.Router()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'meal_app'
})

// Sign up
router.post('/signup', async (req, res) => {
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
router.get('/checkUser/:token', (req, res) => {
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
router.post('/login', (req, res) => {
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

module.exports = router