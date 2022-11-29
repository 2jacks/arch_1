const db = require('../db/index')
const { Employee, Project, Department } = db.models

async function getEmployees(req, res) {
	res.send(
		await Employee.findAll({
			include: [
				{
					model: Project
				},
				{
					model: Department
				}
			]
		})
	)
}

async function getProjects(req, res) {
	res.send(await Project.findAll())
}

async function getDepartments(req, res) {
	res.send(await Department.findAll())
}

module.exports = {
	getEmployees,
	getProjects,
	getDepartments
}
