import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import SalaUser from "./SalaUserModel.js";

const {DataTypes} = Sequelize;

const Salas = db.define('sala',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    
    numero:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    grupo:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Sala de Aula',
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});

Users.belongsToMany(Salas,  {
    through: SalaUser,
    foreignKey:'userId'});
    
Salas.belongsToMany(Users, {
    through: SalaUser,
    foreignKey:'salaId'})

export default Salas;