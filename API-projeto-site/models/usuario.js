'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
	let Usuario = sequelize.define('Usuario', {
		idUser: {
			field: 'idUser',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		puuid: {
			field: 'puuid',
			type: DataTypes.STRING,
			allowNull: false,
		},
		riotId: {
			field: 'riotId',
			type: DataTypes.STRING,
			allowNull: false
		},
		accId: {
			field: 'accId',
			type: DataTypes.STRING,
			allowNull: false
		},
		nameUser: {
			field: 'nameUser',
			type: DataTypes.STRING,
			allowNull: false
		},
		iconId: {
			field: 'iconId',
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		summonerLevel: {
			field: 'summonerLevel',
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		pass: {
			field: 'pass',
			type: DataTypes.STRING,
			allowNull: false,

		},
		fkRole: {
			field: 'fkRole',
			type: DataTypes.INTEGER,
			foreignKey: true,
			allowNull: true,
		}


	},
		{
			tableName: 'tbUser',
			freezeTableName: true,
			underscored: true,
			timestamps: false,
		});

	return Usuario;
};
