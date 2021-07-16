import Joi from 'joi'
import express from 'express'

const port = process.env.HOME_COOKIN_API_PORT || 3001
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/api/recipes', (req, res) => {
    res.send([1,2,3])
})

app.get('/api/recipes/:id', (req, res) => {
    var id = req.params.id
    // req.query
    res.send(id)

    if (false) res.status(404).send('Could not find recipe')
})

app.post('/api/recipes', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        directions: Joi.string().required(),
    })

     const result = schema.validate(req.body)

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    Joi.valid()
    if (!req.body.name) {
        res.status(400).send('Name is required')
        return
    }
    const recipe = {
        id: 1,
        name: req.body.name,
        directions: req.body.directions
    }
    //add recipe here
    res.send(recipe)
})

app.put('/api/recipes/:id', (req, res) => {
    //Look up the recipe
    // it not existing, return 404

    // Validate
    // If invalid, return 400 - Bad request

    // Update course
    // Return the updated course
})

app.delete('/api/recipes/:id', (req, res) => {
    var id = req.params.id
    //if not existing, return 404

    // delete

    //return the recipe
})

app.listen(port, () => console.log('running...'))