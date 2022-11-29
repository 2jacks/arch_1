module.exports = function (sequelize) {
	const { Employee, Department, Project } = sequelize.models
	Project.hasMany(Employee)
	Employee.belongsTo(Project)

	Department.hasMany(Employee)
	Employee.belongsTo(Department)
}
