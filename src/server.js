require('dotenv').config()
const app = require('./app')

const PORT = process.env.API_PORT

app.listen( PORT, () => console.log(`I'm running at port ${PORT}`))
