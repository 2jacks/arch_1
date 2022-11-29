const { getEmployees, getProjects, getDepartments } = require('./getters')
const { createEmployee, createDepartment, createProject } = require('./posters')
const {
	deleteEmployee,
	deleteDepartment,
	deleteProject
} = require('./deleters')
const {
	updateEmployee,
	updateDepartment,
	updateProject
} = require('./updaters')

module.exports = function (app) {
	app.get('/employees', (req, res) => getEmployees(req, res))
	app.get('/projects', (req, res) => getProjects(req, res))
	app.get('/departments', (req, res) => getDepartments(req, res))

	app.post('/employees', (req, res) => createEmployee(req, res))
	app.post('/projects', (req, res) => createProject(req, res))
	app.post('/departments', (req, res) => createDepartment(req, res))

	app.post('/delete_employee', (req, res) => deleteEmployee(req, res))
	app.post('/delete_project', (req, res) => deleteProject(req, res))
	app.post('/delete_department', (req, res) => deleteDepartment(req, res))

	app.put('/employees', (req, res) => updateEmployee(req, res))
	app.put('/projects', (req, res) => updateProject(req, res))
	app.put('/departments', (req, res) => updateDepartment(req, res))
}
