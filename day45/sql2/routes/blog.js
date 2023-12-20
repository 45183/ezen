// mysql 접속과 괄련 api 기능을 담당하는 자바스크립트

const express = require('express');
// 로그인 정보에 접근
const db = require('../data/database');

const router = express.Router();

router.get('/', function(req, res){
    res.redirect('/posts');
});

router.get('/posts', async function(req, res){
    const query = `SELECT posts.*, authors.name AS author_name FROM posts INNER JOIN authors ON posts.author_id = authors.id`;
    const [posts] = await db.query(query);
    res.render('posts-list', {posts: posts});
});

router.get('/new-post', async function(req, res){
    const [authors] = await db.query('SELECT * FROM authors');
    res.render('create-post', {authors: authors});
});

router.post('/posts', async function(req, res){
    const data = [
        req.body.title,
        req.body.summary, 
        req.body.content, 
        req.body.author,
    ];
    await db.query('INSERT INTO posts (title, summary, body, author_id) VALUES(?)', [data,]);
    res.redirect('/posts');
});

// 동적 컨텐츠에 대응하는 동적 세부 주소를 부여
router.get('/posts/:id', async function(req, res){
    const query = `SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts INNER JOIN authors ON posts.author_id = authors.id where posts.id = ?`;
    const [posts] = await db.query(query, [req.params.id]);

    if(!posts || posts.length === 0){
        return res.status(404).render('404');
    };

    // 게시글의 날짜 데이터를 형식에 맞게 표시
    // (...) 스프레드 연산자 - 배열이나 객체를 확장하거나 복사할 때 사용
    const postDate = {
        ...posts[0],
        date : posts[0].date.toISOString(),
        humanReadableDate: posts[0].date.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',})
    };
    res.render('post-detail', {post: postDate});
});

router.get('/posts/:id/edit', async function(req, res){
    const query = `SELECT * FROM posts WHERE id = ?`;
    const [posts] = await db.query(query, [req.params.id]);

    if(!posts || posts.length === 0){
        return res.status(404).render('404');
    };
    
    res.render('update-post', {post: posts[0]});
});

router.post('/posts/:id/edit', async function(req, res){
    const query = `UPDATE posts SET title = ?, summary = ?, body = ? WHERE id = ?`;
    await db.query(query, [
        req.body.title,
        req.body.summary,
        req.body.content,
        req.params.id,
    ]);
    res.redirect('/posts');
});

router.post('/posts/:id/delete', async function(req, res){
    await db.query('DELETE FROM posts WHERE id = ?', [req.params.id]);
    res.redirect('/posts');
});


module.exports = router;