const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
	sequelize.define(
		'Department',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			name: {
				type: DataTypes.STRING
			}
		},
		{
			freezeTableName: true,
			underscored: true
		}
	)
}

// export const Department =
