const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
// env 변수에 지정된 개발, 테스트, 배포 모드 중 해당하는 모드를 가져와서 로그인 정보 불러오기
const config = require('../config/config')[env];
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');


const db = {};
const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);

module.exports = db;