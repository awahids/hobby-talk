const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const router = require('./routes')
const db = require('./db/database')
const passport = require('./middlewares/passport')
const session = require('cookie-session')
const cors = require('cors')


app.use(cors())
app.use(express.json())
db()
app.use(session({
    name: "userlogin-cookie",
    keys: ["apaaja", "bisaapaaja"]
}))
app.use(cors(), passport.initialize())
app.use(cors(), passport.session())
app.use('/api/v1', router)


app.get('/', (req, res) => {
    return res.status(200).json({
        status: "running",
        message: "server connected"
    })
})
module.exports = app
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})