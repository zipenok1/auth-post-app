import sequelize from "../db.js"
import { DataTypes } from 'sequelize'

const User = sequelize.define('user', {
    id_user:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    email:{
        type: DataTypes.STRING,
        unique: true,
    },
    password:{
        type: DataTypes.STRING,
    }
},
{
    tableName: 'user',
    timestamps: false,
})

const Posts = sequelize.define('posts', { 
    id_posts:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id_user'
        }
    }
}, {
    tableName: 'posts',
    timestamps: false  
})

User.hasMany(Posts, { foreignKey: 'userId', as: 'posts' })
Posts.belongsTo(User, { foreignKey: 'userId', as: 'user' })

export default {
    User,
    Posts
}