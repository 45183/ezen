// const Sequelize = require('sequelize');

// class Comment extends Sequelize.Model {
//     static init(sequelize){
//         return super.init({
//             comment : {
//                 type: Sequelize.STRING(100),
//                 allowNull: false,
//             },
//             created_at : {
//                 type: Sequelize.DATE,
//                 allowNull: false,
//                 defaultValue: Sequelize.NOW,
//             },
//             commenter: {
//                 type: Sequelize.INTEGER,
//                 allowNull: false,
//                 reference: {
//                     mode: 'user',
//                     key: 'id',
//                 },
//             }
//         },{
//             sequelize,
//             timestamps : false,
//             modelName: 'Comment',
//             tableName: 'comments',
//             paranoid: false,
//             charset: 'utf8',
//             collate: 'utf8_general_ci'
//         })
//     }

//     static associate(db){
//         db.Comment.hasMany(db.User, {foreignKey: 'commenter', targetKey: 'id'});
//     }
// }

// module.exports = Comment;


const Sequelize = require('sequelize');

class Comment extends Sequelize.Model {
  static initiate(sequelize) {
    Comment.init({
      comment: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      commenter: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Comment',
      tableName: 'comments',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
  }
};

module.exports = Comment;
