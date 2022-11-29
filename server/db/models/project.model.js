const { DataTypes } = require('sequelize')

module.exports = sequelize => {
	sequelize.define(
		'Project',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			title: {
				type: DataTypes.STRING
			}
		},
		{
			freezeTableName: true,
			underscored: true
		}
	)
}

// export const Project =
