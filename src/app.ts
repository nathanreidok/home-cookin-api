
import express from 'express'
import recipesApi from './routes/recipesApi'

const port = process.env.HOME_COOKIN_API_PORT || 3001
const app = express()

app.use(express.json())

app.use('/recipes', recipesApi)

app.get('/', (req, res) => {
    res.send('Hello')
})



app.listen(port, () => console.log('running...'))