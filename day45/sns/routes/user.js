const express = require('express');

const {isloggedIn} = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/:id/follow', isloggedIn, async (req, res, next) => {
    try{
        // 현재 로그인한 사용자를 db에서 찾음
        const user = await User.findOne({where: {id: req.user.id}});
        if(user){
            // 찾은 사용자가 있다면, 그 사용자를 팔로우      // 10진수
            await user.allFollowing(parseInt(req.params.id, 10));
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