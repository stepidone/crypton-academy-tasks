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
  faculty: string;
  averageGrade: Number
}

module.exports = (sequelize: any, DataTypes: any) => {
  class user extends Model<UserAttributes> 
  implements UserAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string
    firstName!: string
    lastName!: string
    sex!: boolean
    phone!: string
    faculty!: string
    averageGrade!: Number
    static associate(models: any) {
      // define association here
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
    faculty: {
      type: DataTypes.STRING,
      allowNull: true
    },
    averageGrade: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true
      }
    }
  }, {
    sequelize,
    tableName: 'Users',
    modelName: 'User',
  });
  return user;
};