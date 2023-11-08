const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');
const crypto = require('crypto');
var cors = require("cors");

const app = express();
const port = 3110;


app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
  host: '127.0.0.1',
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

  const rand = () =>
  Math.random()
    .toString(36)
    .substr(2);

  app.get("/get", (req, res) => {
    return res.json({ getval: rand() });
  });
  
  //POST
  app.post("/post", function(req, res) {
    return res.json({ postval: `${rand()}:${JSON.stringify(req.body)}` });
  });


app.get('/api/testServerApi', (req, res) => {
      res.status(200).json( { success: true, message: 'API работает' } );
});
app.post('/api/login', (req, res) => {
  const { userName, password } = req.body;
  const query = `SELECT * FROM users WHERE login = ? AND password = ?`;
  connection.query(query, [userName, hashPassword(password)], (error, results) => {
    if (error) {
      console.error('Ошибка выполнения запроса:', error);
      res.status(500).json({ success: false });
    } else {
      if (results.length > 0) {
        const userId = results[0].id;
        res.json({ success: true, id: userId, authkey: `${rand()}-${rand()}-${rand()}-${userId}`});
      } else {
        res.json({ success: false, message: 'Неправильное имя пользователя или пароль' });
      }
    }
  });
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту: ${port}`);
    console.log(`Используй: localhost:${port}/api/testServerApi`);
});