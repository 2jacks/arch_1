const db = require('../db/index')
const { Employee, Project, Department } = db.models

async function createEmployee(req, res) {
	console.log(req.body)
	await Employee.create({
		firstName: req.body.firstName,
		secondName: req.body.secondName,
		ProjectId: req.body.ProjectId,
		DepartmentId: req.body.DepartmentId
	})
	res.send('200')
}

async function createProject(req, res) {
	console.log(req.body)
	await Project.create({
		title: req.body.title
	})
	res.send('200')
}

async function createDepartment(req, res) {
	console.log(req.body)
	await Department.create({
		name: req.body.name
	})
	res.send('200')
}

module.exports = {
	createEmployee,
	createProject,
	createDepartment
}
