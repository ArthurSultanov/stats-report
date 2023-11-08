const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');
const crypto = require('crypto');

const app = express();
const port = 3110;


app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


function generateRandomString(length) {
  const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    randomString += symbols.charAt(randomIndex);
  }

  return randomString;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const connection = mysql.createConnection({
  host: '192.168.43.31',
  user: 'root',
  password: '',
  database: 'stats-report'
});


connection.connect((error) => {
  if (error) {
    console.error("Ошибка подключения к базе данных:", error);
    console.error("Попробуй запусти OpenServer и phpmyadmin");
    console.error("Если запущен, то проверь пароль и логин пользователя базы данных");
  } else {
    console.log("Подключение к базе данных успешно установлено");
  }
});

function hashPassword(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
  }

app.get('/api/testServerApi', (req, res) => {
      res.status(200).json( { success: true, message: 'API работает' } );
});
app.get('/api/login', (req, res) => {
    const login = req.params.login;
    const password = req.params.password;
    console.log(`body: ${JSON.stringify(req.params)}; login: ${login}; password: ${password}`);
    const query = 'SELECT * FROM users WHERE login = ? AND password = ?';
    connection.query(query, [login, password], (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        res.status(500).json({ success: false });
      } else {
        if (results.length > 0) {
          const userId = results[0].id;
          res.json({ success: true, id: userId });
        } else {
          res.status(401).json({ success: false, message: 'Неправильное имя пользователя или пароль' });
        }
      }
    });
  });


app.listen(port, () => {
    console.log(`Сервер запущен на порту: ${port}`);
    console.log(`Используй: localhost:${port}/api/testServerApi`);
});a