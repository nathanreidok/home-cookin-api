
import express from 'express'
import recipesApi from './routes/recipesApi'
import cors from 'cors'

const port = process.env.HOME_COOKIN_API_PORT || 3001
const app = express()

const corsOptions = {
    origin: 'http://localhost:3000'
  }

app.use(express.json())
app.use(cors(corsOptions))

app.use('/recipes', recipesApi)

app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(port, () => console.log(`Running on port ${port}`))