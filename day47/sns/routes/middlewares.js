// 로그인 여부를 확인해서 정상통과 시키거나 오류메세지 출력
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인이 필요합니다.');
    };
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    } else {
        const message = encodeURIComponent('로그인된 상태입니다.');
        res.redirect(`/?error=${message}`);
    };
};