const express = require('express');

// 로그인 여부 확인 미들웨어를 가져옴
const {isLoggedIn} = require('./middlewares'); 
// 사용자 모델 가져옴
const User = require('../models/user');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
    try{
        // 현재 로그인한 사용자를 db에서 찾음
        const user = await User.findOne({where: {id: req.user.id}});
        if(user){
            // 찾은 사용자가 있다면, 그 사용자를 팔로우      // 10진수
            await user.addFollowing(parseInt(req.params.id, 10));
            res.send('success');
        } else {
            // 사용자가 없다면 존재하지 않는다고 보여줌
            res.status(404).send('no user');
        }
    } catch(error){
        console.error(error);
        next(error);
    };
});

module.exports = router;