const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');

// MySQL 연결 설정
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'mydb',
});

// MySQL 연결
connection.connect((err) => {
    if (err) {
        console.error('MySQL 연결 오류:', err);
    } else {
        console.log('MySQL 연결 성공');
    }
});

// CORS 설정 (모든 도메인 허용)
app.use(cors());

// JSON 파싱을 위한 설정
app.use(express.json());

// 공지사항 등록 처리
app.post('/register-notice', (req, res) => {
    console.log('/register-notice 요청 받음');
    const { title, content, name, startD, endD, type, sc_id } = req.body;

    if (!title || !content || !name || !sc_id) {
        return res.status(400).json({
            status: 400,
            message: 'Title, content, name, and school ID are required fields.'
        });
    }

    const query = 'INSERT INTO Notice (Title, Content, Name, StartD, EndD, Type, SC_ID) VALUES (?, ?, ?, ?, ?, ?, ?)';

    connection.query(query, [title, content, name, startD, endD, type, sc_id], (err, results) => {
        if (err) {
            console.error('공지사항 등록 쿼리 실행 오류:', err);
            return res.status(500).json({
                status: 500,
                message: 'Failed to register notice'
            });
        }

        console.log('공지사항 등록 성공:', results);
        res.status(200).json({
            status: 200,
            message: 'Notice registered successfully',
            noticeId: results.insertId
        });
    });
});

// 서버 시작
app.listen(3000, function() {
    console.log('node start on port 3000');
});
