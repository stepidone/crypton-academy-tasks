'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.Sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removaColumn('user', 'faculty', {transaction: t})
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.Sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('user', 'faculty', {
          type: Sequelize.DataTypes.STRING,
          allowNull: true
        }, {transaction: t})
      ]);
    });
  }
};
