const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = require('./routes/routes')

const db = require('./db')
const { Employee, Project, Department } = db.models

const PORT = 3001

const app = express()
app.use(bodyParser.json())
app.use(cors())

async function connectToDb() {
	await db.authenticate()
	await db.sync()
}

app.post('/auth', async (req, res) => {
	let [firstName, secondName] = req.body.username.split(' ')
	let user
	try {
		user = await Employee.findOne({
			where: { firstName: firstName, secondName: secondName }
		})
	} catch {
		user = null
	}

	if (user) res.status(200).send(user)
	else res.status(500).send('No such user')
})

connectToDb()
	.then(async res => {
		routes(app)
		app.listen(PORT, () => {
			console.log(`Server is on ${PORT} port`)
		})
	})
	.catch(err => {
		console.log('Can`t connect to DB, shutting down server')
	})
