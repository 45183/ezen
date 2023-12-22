const express = require('express');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
// mysql 데이터베이스 테이블 정보와 관계를 읽어들이는 파트
const {Post, User, Hashtag} = require('../models');

const router = express.Router();

// 모든 경로에 공통으로 적용되는 미들웨어
router.use((req, res, next) => {
    // 현재 로그인한 사용자 정보
    res.locals.user - req.user;
    // 팔로워 수
    res.locals.followerCount = req.user ? req.user.Followers.length : 0;
    // 팔로잉 수
    res.locals.followingCount = req.user ? req.user.Followings.length : 0;
    // 팔로잉하는 사용자 id목록
    res.locals.followerIdlist = req.user ? req.user.Followings.map(f => f.id):[];
    next();
});

// 프로필 페이지 경로
router.get('/profile', isLoggedIn, (req, res) => {
    // 프로필 페이지 렌더링
    res.render('profile', {title: '내정보 -nodebird'});
});

// 회원 가입 페이지 경로
router.get('/join', isNotLoggedIn, (req, res) => {
    // 회원 가입 페이지 렌더링
    res.render('join', {title:'회원가입 -nodebird'});
});

// 메인페이지 경로
router.get('/', async (req, res, next) => {
    try{
        // 모든 게시글 조회
        const posts = await Post.findAll({
            include: {
                // 게시글 작성자 정보를 고유id번호와 id 정보로 파악함
                model: User,
                attributes: ['id', 'nick'],
            },
            // 최신순으로 정렬
            order: [['createdAt', 'DESC']]
        });
        res.render('main', {
            title: 'NodeBird',
            // 게시글 목록
            twits: posts,
        });
    } catch(error){
        console.error(error);
        next(error);
    };
});


// 해시태그 검색 경로
router.get('/hashtag', async (req, res, next) => {
    // 쿼리에서 해시태그 추출
    const query = req.query.hashtag;
    if(!query){
        // 해시태그가 없다면 메인 페이지로 원복
        return res.redirect('/');
    };
    try{
        // 해당되는 해시태그의 조회
        const hashtag = await Hashtag.findOne({where: {title: query}});
        let posts = [];
        if(hashtag){
            // 해당 해시태그를 포함하는 게시글의 조회 & 게시글 작성자 정보 포함
            posts = await hashtag.getPosts({include: [{model: User}]});
        };
        return res.render('main', {
            title: `${query} | NodeBird`,
            // 게시글 목록
            twits: posts,
        });
    } catch(error){
        console.error(error);
        next(error);
    };
});

module.exports = router;