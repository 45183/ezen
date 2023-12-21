const express = require('express');
// 사진 업로드 라이브러리
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try{
    // upload라는 폴더가 존재하는 체크
    fs.readdirSync('uploads');
} catch(error){
    // uploads 폴더가 없는 경우
    console.error('uploads 폴더가 존재하지 않습니다.');
    // uploads라는 폴더 생성
    fs.mkdirSync('uploads')
};

// multer 설정 - 파일 저장위치, 파일명, 파일크기 제한
const upload = multer({
    storage: multer.diskStorage({
        destination(req, res, cb){
            // 파일 저장경로
            cb(null, 'uploads/');
        },
        filename(req, file, cb){
            // 파일 확장자 추출
            const ext = path.extname(file.originalname);
            // 파일명 설정
            cb(null, paht.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    // 파일 크기제한 : 5메가바이트
    limits: {fileSize: 5 * 1024 * 1024}
});

// 이미지 업로드 경로
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
    console.log(req.file);
    // 업로드된 파일의 url 반환
    res.json({url: `/img/${req.file.filename}`});
});

const upload2 = multer();

router.post('/', isLoggedIn, upload2.none(), async(req, res, next) => {
    try{
        console.log(req.user);
        // 새 게시글 생성
        const post = await Post.create({
            // 게시글 내용
            content: req.body.content,
            // 이미지 파일 주소
            img: req.body.url,
            // 사용자 id
            UserId: req.user.id,
        });
        // 해시태그 추출 및 처리
        const hashtags = req.body.content.match(/#[^\s#]*/g);
        if(hashtags){
            const result = await Promise.all(
                hashtags.map(tag => {
                    // 해시태그 생성 혹은 조회
                    return Hashtag.findOrCreate({
                        where: {title:tag.slice(1).toLowerCase()},
                    });
                }),
            )
            // 게시글에 해시태그 연결
            await post.addHashtags(result.map(r => r[0]));
        }
        // 주 서비스 주소로 원복
        res.redirect('/');
    } catch(error){
        console.error(error);
        next(error);
    };
});

module.exports = router;