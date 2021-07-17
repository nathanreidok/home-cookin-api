import Joi from 'joi'
import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    var recipes = recipeData
    res.send(recipes || [])
})

router.get('/:id', (req, res) => {
    var id = req.params.id

    var recipe = recipeData.find(r => r.id == id)

    if (!recipe) return res.status(404).send('Could not find recipe')
    res.send(recipe)
})

router.post('/', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        directions: Joi.string().required(),
    })

     const result = schema.validate(req.body)

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    const recipe = {
        id: Math.max.apply(Math, recipeData.map(r => parseInt(r.id))).toString(),
        name: req.body.name,
        directions: req.body.directions,
        ingredients: req.body.ingredients,
    }
    recipeData.push(recipe)

    res.send(recipe)
})

router.put('/api/recipes/:id', (req, res) => {
    var id = req.params.id

    var recipe = recipeData.find(r => r.id == id)

    if (!recipe) return res.status(404).send('Could not find recipe')
    
    const schema = Joi.object({
        name: Joi.string().required(),
        directions: Joi.string().required(),
    })

    const result = schema.validate(req.body)

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    recipe!.name = req.body.name
    recipe!.directions = req.body.directions
    recipe!.ingredients = req.body.ingredients

    res.send(recipe)
})

router.delete('/api/recipes/:id', (req, res) => {
    var id = req.params.id

    var index = recipeData.findIndex(r => r.id == id)

    if (!(index >= 0)) return res.status(404).send('Could not find recipe')

    recipeData = recipeData.splice(index, 1)

    res.send()
})

export default router

let recipeData = ['1','2','3','4','5','6','7','8','9','10'].map(value => ({
    id: value,
    name: 'Cake',
    directions: 'Mix it and bake it.',
    ingredients: [{
        recipeId: value,
        ingredientId: 1,
        ingredient: 'Eggs',
        qtyNumerator: 1,
        qtyDenominator: 1,
    },{
        recipeId: value,
        ingredientId: 2,
        ingredient: 'Milk',
        qtyNumerator: 1,
        qtyDenominator: 2,
        measurementId: 3,
        measurement: 'Tablespoon',
    },{
        recipeId: value,
        ingredientId: 3,
        ingredient: 'Sugar',
        qtyNumerator: 5,
        qtyDenominator: 2,
        measurementId: 2,
        measurement: 'Cup'
    }],
}))