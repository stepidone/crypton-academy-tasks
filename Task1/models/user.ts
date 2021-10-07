'use strict';
import {
  Model
} from 'sequelize';

interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  sex: boolean;
  phone: string;
  averageGrade: Number
  // faculty_id: Number
}

module.exports = (sequelize: any, DataTypes: any) => {
  class user extends Model<UserAttributes> 
  implements UserAttributes{
    id!: string
    firstName!: string
    lastName!: string
    sex!: boolean
    phone!: string
    averageGrade!: Number
    // faculty_id!: Number
    static associate(models: any) {

    }
  };
  user.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
          customValidator(value: any) {
            if (typeof value !== 'boolean')
            throw new Error('sex must be true(male) or false(female)')
          }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    averageGrade: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true
      }
    },
    // faculty_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'Faculty',
    //     key: 'id'
    //   }
    // }
  }, {
    sequelize,
    tableName: 'Users',
    modelName: 'User',
  });
  return user;
};