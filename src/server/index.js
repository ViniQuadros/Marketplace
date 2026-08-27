import express from 'express'
import cors from 'cors'
import usersRouter from './users.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)

app.listen(3000, () => console.log('API runnig at PORT 3000'))