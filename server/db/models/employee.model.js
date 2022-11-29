const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
	sequelize.define(
		'Employee',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			firstName: {
				type: DataTypes.STRING
			},
			secondName: {
				type: DataTypes.STRING
			}
		},
		{
			freezeTableName: true
			//underscored: true
		}
	)
}

// export const Employee =
