// start by importing dependency modules:
const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')

// Next, define the MongoDB connection string for the local database instance and the database name edx-course-db. Also apply middleware for logging and body parsing:
const url = 'mongodb://localhost:27017/edx-course-db'

let app = express()
app.use(logger('dev'))
app.use(bodyParser.json())

// Connect to the database using the connect method and the connection URI (url). Define all routes in a callback using the MongoDB native driver methods starting with GET /accounts in which you will use sort to sort the query result in reverse ObjectID order and toArray to get an array of accounts.
mongodb.MongoClient.connect(url, (error, db) => {
    if (error) return process.exit(1)

    app.get('/accounts', (req, res) => {
        db.collection('accounts')
            .find({}, { sort: { _id: -1 } })
            .toArray((error, accounts) => {
                if (error) return next(error)
                res.send(accounts)
            })
    })

// In the route for POST /accounts, take data from the request body (req.body) and use it in insert to create a new account. Optionally, validate and sanitize the data of the request body with if/else statements or the express-validate module.
    app.post('/accounts', (req, res) => {
        let newAccount = req.body
        db.collection('accounts').insert(newAccount, (error, results) => {
            if (error) return next(error)
            res.send(results)
        })
    })

// For the PUT route, define a URL parameter :id and access it with req.params.id. Use req.body (request body) to pass the new account to the update method. Use mongodb.ObjectID with req.params.id to convert the string ID to an ObjectID which is needed for the update method query:
    app.put('/accounts/:id', (req, res) => {
        db.collection('accounts')
            .update({ _id: mongodb.ObjectID(req.params.id) }, { $set: req.body }, (error, results) => {
                if (error) return next(error)
                res.send(results)
            })
    })

// In DELETE, use URL parameter for the ID again. This time, the MongoDB method is remove but it also takes the URL parameter ID wrapped in mongodb.ObjectID for the proper object type in the query.
    app.delete('/accounts/:id', (req, res) => {
        db.collection('accounts').remove({ _id: mongodb.ObjectID(req.params.id) }, (error, results) => {
            if (error) return next(error)
            res.send(results)
        })
    })
    app.use(errorhandler())
    app.listen(3000)
})