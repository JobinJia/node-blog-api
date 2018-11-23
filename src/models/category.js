import sequelize from '../lib/sequelize'
import Sequelized from 'sequelize'

const Category = sequelize.define('category', {
  id: {
    field: 'id',
    type: Sequelized.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true
  },
  cateName: {
    field: 'name',
    type: Sequelized.STRING,
    allowNull: false
  },
  icon: {
    field: 'icon',
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
  del: {
    field: 'del',
    type: Sequelized.INTEGER,
    defaultValue: 0,
    allowNull: false
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

  tableName: 'category'
  // paranoid: true
})

export default Category
