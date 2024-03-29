const express = require('express')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const db = require('../dbConnection')

const router = express.Router()


// Sign up
router.post('/signup', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const userId = uuid.v4()

        db.query( 
            "INSERT INTO users(id, email, password) VALUES(UUID_TO_BIN(?), ?, ?)",
            [userId, req.body.email, hashedPassword],
            function(err, result) {
                if (err) throw err

                res.json({token: userId})
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
        "SELECT email FROM users WHERE id=UUID_TO_BIN(?)",
        [JSON.parse(token)],
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
        'SELECT BIN_TO_UUID(id) id, password FROM users WHERE email=?',
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