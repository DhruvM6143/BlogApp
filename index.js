import dotenv from 'dotenv'

import { app } from './app.js'
import connectDB from './DataBase/index.db.js'
dotenv.config()
const PORT = process.env.PORT || 8000;
connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log("MongoDB Connection Error!! ", err);
    })