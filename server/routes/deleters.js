const db = require('../db/index')
const { Employee, Project, Department } = db.models

async function deleteEmployee(req, res) {
	console.log('EMP TO DELETE', req.body)
	await Employee.destroy({
		where: {
			id: req.body.id
		}
	})
	res.send('200')
}

async function deleteProject(req, res) {
	console.log(req.body)
	await Project.destroy({
		where: {
			id: req.body.id
		}
	})
	res.send('200')
}

async function deleteDepartment(req, res) {
	console.log(req.body)
	await Department.destroy({
		where: {
			id: req.body.id
		}
	})
	res.send('200')
}

module.exports = {
	deleteEmployee,
	deleteProject,
	deleteDepartment
}
