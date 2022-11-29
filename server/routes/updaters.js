const db = require('../db/index')
const { Employee, Project, Department } = db.models

async function updateEmployee(req, res) {
	await Employee.update(
		{
			firstName: req.body.firstName,
			secondName: req.body.secondName,
			DepartmentId: req.body.DepartmentId,
			ProjectId: req.body.ProjectId
		},
		{
			where: {
				id: req.body.id
			}
		}
	)
	res.send('200')
}

async function updateProject(req, res) {
	await Project.update(
		{ title: req.body.title },
		{
			where: {
				id: req.body.id
			}
		}
	)
	res.send('200')
}

async function updateDepartment(req, res) {
	await Department.update(
		{ name: req.body.name },
		{
			where: {
				id: req.body.id
			}
		}
	)
	res.send('200')
}

module.exports = {
	updateEmployee,
	updateProject,
	updateDepartment
}
