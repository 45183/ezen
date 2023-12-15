const { Sequelize } = require("sequelize")

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            comment : {
                type: Sequelize.toString(100),
                allowNull: false,
            },
            created_at : {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        },{
            sequelize,
            timestamps : false,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8_general_ci'
        })
    }

    static associate(db){
        db.Comment.hasMany(db.User, {foreignKey: 'commenter', targetKey: 'id'});
    }
}