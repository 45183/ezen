// // sequelize 모듈을 써서 user 모델을 정의하고 보내는 코드
// // sql 테이블에 맞게 데이터 생성 & 내보내기

// const Sequelize = require('sequelize');
// // const { now } = require('sequelize/types/utils');

// // module.exports : 뭘 내보낼지를 설정하는 모듈
// // class User extends Sequelize.Model : 자바스크립트의 클래스 정의
// // User 클래스는 Sequelize.Model 클래스의 확장
// // Sequelize에서 제공하는 모델클래스를 상속받아 새로운 모델을 정의 가능
// // User 클래스는 sql db 테이블과 연결 & 데이터 읽고 쓰기위한 기능 포함
// // 굳이 User 클래스에서 Sequelize.Model 클래스를 받아서 확장하는 이유
// // User 클래스를 통해서 기존에 제공된 Sequelize.Model
// module.exports = class User extends Sequelize.Model {
//     // 모델 초기화
//     static init(sequelize){         // index.js의 sequelize
//         return super.init({
//             name: {
//                 type: Sequelize.STRING(20),
//                 allowNull: false,
//                 unique: true,
//             },
//             age: {
//                 type: Sequelize.INTEGER.UNSIGNED,
//                 allowNull: false,
//             },
//             married: {
//                 type: Sequelize.BOOLEAN,
//                 allowNull: false,
//             },
//             comment: {
//                 type: Sequelize.TEXT,
//                 allowNull: true,
//             },
//             created_at: {
//                 type: Sequelize.DATE,
//                 allowNull: false,
//                 defaultValue: Sequelize.NOW,
//             }
//         },{
//             // mysql에 필요한 조건을 지정해야 함.
//             sequelize,
//             timestamps: false,      // 타임스탬프 자동생성 비활성화
//             underscored: false,     // 카멜케이스로 컬럼명 생성
//             modelName: 'User',
//             tableName: 'users',
//             paranoid: false,        // 소프트삭제 비활성화
//             charset: 'utf8',        // 다국어 지원
//             collate: 'utf8_general_ci',
//         });
//     };

//     static associate(db){
//         // User 모델과 Comment 모델간의 일대다 관계 설정 (유저 한명이 댓글 여러개 가능)
//         db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey: 'id'});
//     };
// };



const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init({
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      married: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
  }
};

module.exports = User;
