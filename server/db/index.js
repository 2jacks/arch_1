const { Sequelize } = require('sequelize')
const defineRelations = require('./relations')

const sequelize = new Sequelize('trema', 'postgres', '315220kalter', {
	host: 'localhost',
	dialect: 'postgres',
	define: {
		timestamps: false
	}
})

const models = [
	require('./models/department.model'),
	require('./models/project.model'),
	require('./models/employee.model')
]

models.forEach(defineModel => {
	defineModel(sequelize)
})

defineRelations(sequelize)

module.exports = sequelize
