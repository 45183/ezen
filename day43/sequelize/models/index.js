// const Sequelize = require('sequelize')
// const User = require('./user');
// const Comment = require('./comment');

// // 환경변수 NODE_ENV를 가져오거나 'development'로 설정
// const env = process.env.NODE_ENV || 'development';
// // 설정파일(config.js)에서 해당 환경의 설정을 가져옴
// const config = require('../config/config')[env];
// // 데이터베이스 객체를 생성
// const db = {};

// const sequelize = new Sequelize(config.database, config.username, config.password, config);

// // db 객체에 Sequelize 모델과 로그인 정보를 연결
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // db 객체에 테이블 관련 스크립트 연결
// db.User = User;
// db.Comment = Comment;

// // User 스크립트의 초기화 메서드를 호출
// User.init(sequelize);

// // Comment 스크립트의 초기화 메서드를 호출
// Comment.init(sequelize);

// // User 모델과 Comment 모델 간의 관계를 설정하는 associate 메서드를 호출
// User.associate(db);
// Comment.associate(db);

// // db 객체를 내보냄
// module.exports = db;


const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

User.initiate(sequelize);
Comment.initiate(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;
