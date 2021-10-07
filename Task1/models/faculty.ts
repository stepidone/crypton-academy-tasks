'use strict';
import {
  Model
} from 'sequelize';

interface FacultyAttributes {
  id: number;
  name: string
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Faculty extends Model<FacultyAttributes> 
  implements FacultyAttributes{
    id!: number
    name!: string
    static associate(models: any) {
      Faculty.hasMany(models.User, {
        foreignKey: 'faculty_id'
      });
    }
  };
  Faculty.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Faculty',
  });
  return Faculty;
};