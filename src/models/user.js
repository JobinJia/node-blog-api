import sequelize from '../lib/sequelize'
import Sequelized from 'sequelize'

const User = sequelize.define('user', {
  userName: {
    field: 'user_name',
    type: Sequelized.STRING,
    allowNull: false
  },
  userTel: {
    field: 'user_tel',
    type: Sequelized.STRING,
    allowNull: true,
    defaultValue: ''
  },
  createTime: {
    field: 'create_time',
    type: Sequelized.DATE,
    defaultValue: Sequelized.NOW,
    allowNull: false
  },
  updateTime: {
    field: 'update_time',
    type: Sequelized.DATE,
    defaultValue: Sequelized.NOW,
    allowNull: false
  },
  account: {
    field: 'user_account',
    type: Sequelized.STRING,
    allowNull: false,
    defaultValue: null
  },
  id: {
    field: 'id',
    type: Sequelized.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true
  },
  password: {
    field: 'password',
    type: Sequelized.STRING,
    allowNull: false,
    defaultValue: null
  },
  qq: {
    field: 'user_qq',
    type: Sequelized.STRING,
    allowNull: true,
    defaultValue: null
  },
  wx: {
    field: 'user_wx',
    type: Sequelized.STRING,
    allowNull: true,
    defaultValue: null,
    unique: true
  }
}, {
  freezeTableName: true,
  // 不要忘了启用 timestamps
  timestamps: true,

  // 不想使用 createdAt
  createdAt: false,

  // 想 updatedAt 的实际名为 'updateTimestamp'
  updatedAt: false, // 'updateTimestamp'

  // 要将 deletedAt 设置为 destroyTime (注意要启用paranoid)
  deletedAt: false, // 'destroyTime'

  tableName: 'user'
  // paranoid: true
})

export default User
