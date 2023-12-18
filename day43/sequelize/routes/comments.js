const express = require('express');
const {Comment} = require('../models');

const router = express.Router();

// 새로운 댓글을 생성하는 함수
router.post('/', async(req, res, next) => {
    try{
        const comment = await Comment.create({
            commenter: req.body.id,     // req.body.id -> 요청된 본문에서 사용자 id를 가져와서 댓글 작성자로 설정
            comment: req.body.comment,  // req.body.comment -> 요청된 본문에서 댓글 내용을 가져와서 댓글 필드로 설정
        });
        // 성공적으로 생성된 댓글을 응답
        console.log(comment);
        res.status(201).json(comment);
    } catch(err){
        console.error(err);
        next(err);
    };
});

// 댓글을 업데이트하는 함수
router.route('/:id')
.patch(async (req, res, next) => {
    try{
        const result = await Comment.update({
            comment: req.body.comment,      // 요청 본문에서 새로운 댓글 내용을 가져와서 업데이트 할 때
        },{ 
            where: {id: req.params.id},     // 주어진 id를 가진 댓글을 찾아서 업데이트
        });
        
        // 업데이트 된 결과 응답
        res.json(result);
    } catch(err){
        console.error(err);
        next(err);
    };
})
.delete(async(req, res, next) => {
    try{
        // 주어진 id를 가진 댓글을 삭제
        const result = await Comment.destroy({
            where: {id: req.params.id}
        });
        res.json(result);
    } catch(err){
        console.error(err);
        next(err);
    };
});

module.exports = router;