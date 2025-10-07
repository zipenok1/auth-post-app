import "dotenv/config"
import './models/model.js'
import express from 'express'
import cors from 'cors'
import sequelize from "./db.js"
import router from "./routers/index.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(7000, () => {console.log('server start')})
    } catch(e){
        console.log('error', e)
    }    
}

start()