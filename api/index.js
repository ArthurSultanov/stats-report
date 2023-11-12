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
  
  app.post("/post", function(req, res) {
    return res.json({ postval: `${rand()}:${JSON.stringify(req.body)}` });
  });


app.get('/api/testServerApi', (req, res) => {
      res.status(200).json( { success: true, message: 'API работает' } );
});

app.get('/api/getUserInfo/:uid', (req, res) => {
 	 const userid = req.params.uid;
 	 console.log(`GET INFO ID: ${userid}`);
	 const query = 'SELECT * FROM users WHERE id = ?';
	 connection.query(query, [userid], (err, results) => {
	    if (err) throw err;
	    
	    if (results.length > 0) {
	      const users = results[0];
	      res.json(users);
	    } else {
	      res.status(404).json({ error: 'Пользователь не найден' });
	    }
	  });
});

app.post('/api/checkAdmin', (req, res) => {
  const { authkey } = req.body;
  const query = `
    SELECT admin_lvl FROM users WHERE authkey = ?;
  `;

  connection.query(query, [authkey], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const admin_lvl = results[0].admin_lvl;
      const isAdmin = admin_lvl > 0;
      
      res.status(200).json({ isAdmin });
    } else {
      res.status(404).json({ error: 'Пользователь не найден' });
    }
  });
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
        authkey = `${rand()}-${rand()}-${rand()}-${userId};`
        const log_sql = 'UPDATE users SET authkey = ? WHERE id = ?';
        delete results[0].password;
        connection.query(log_sql, [authkey, userId], (err) => {
          if (err) {
            console.error('Ошибка при обновлении: ' + err);
            res.status(500).json({ success: false, error: 'Ошибка ' });
            return;
          }
        else{
          res.json({ success: true, id: userId, authkey: `${authkey}`, userInfo: results[0]});
        }});

      } else {
        res.json({ success: false, message: 'Неправильное имя пользователя или пароль' });
      }
    }
  });
});


app.post('/api/addWorkExperience', (req, res) => {
  const { user_id, table } = req.body;

  connection.query('INSERT INTO employee_work_exp (id_user) VALUES (?)', [user_id], (err, result) => {
    if (err) {
      console.error('Ошибка при вставке в employee_work_exp:', err);
      res.status(500).send('Ошибка сервера');
    } else {
      const expId = result.insertId;

      table.forEach((row) => {
        const { name_of_indicators, common, teacher } = row;
        not_exp = teacher.col18;
        delete teacher.col18
        connection.query(
          'INSERT INTO employee_work_exp_body (id_doc, name_of_indicators, all_exp, teach_exp, not_exp) VALUES (?, ?, ?, ?, ?)',
          [expId, name_of_indicators, JSON.stringify(common), JSON.stringify(teacher), not_exp],
          (err) => {
            if (err) {
              console.error('Ошибка при вставке в employee_work_exp_body:', err);
              res.status(500).send('Ошибка сервера');
            }
          }
        );
      });

      res.status(200).send('Данные успешно добавлены');
    }
  });
});

app.get('/api/dataExpEmployee/:id_doc', async (req, res) => {
  const id_doc = req.params.id_doc;
  const query = `
    SELECT
      u.login,
      u.complectName,
      ewe.dateCreate,
      ewe.id_user,
      eweb.name_of_indicators,
      eweb.all_exp,
      eweb.teach_exp,
      eweb.not_exp
    FROM
      employee_work_exp_body AS eweb
    JOIN
      employee_work_exp AS ewe ON eweb.id_doc = ewe.id
    JOIN
      users AS u ON ewe.id_user = u.id
    WHERE
      eweb.id_doc = ?
  `;
  connection.query(query, [id_doc], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const firstResult = results[0];

      const resultObject = {
        login: firstResult.login,
        complectName: firstResult.complectName,
        dateCreate: firstResult.dateCreate,
        id_user: firstResult.id_user,
        table: results.map((row) => ({
          name_of_indicators: row.name_of_indicators,
          all_exp: row.all_exp,
          teach_exp: row.teach_exp,
          not_exp: row.not_exp,
        })),
      };

      res.json(resultObject);
    } else {
      res.status(404).json({ error: 'Таблица не найдена' });
    }
  });
});


app.post('/api/dataExpEmployee', async (req, res) => {
  const { authkey } = req.body;

  const checkAdminQuery = `
    SELECT admin_lvl FROM users WHERE authkey = ?;
  `;

  connection.query(checkAdminQuery, [authkey], (adminErr, adminResults) => {
    if (adminErr) {
      console.error('Error checking admin_lvl:', adminErr);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const isAdmin = adminResults.length > 0 && adminResults[0].admin_lvl > 0;

    let dataQuery;
    let queryParams;

    if (isAdmin) {
      dataQuery = `
        SELECT 
          ewe.id, 
          u.complectName AS userName, 
          ewe.dateCreate, 
          ewe.disabled, 
          ewe.lastEditFrom, 
          ewe.timeLastEdit, 
          o.name_of_organization AS orgName, 
          r.name AS regionName, 
          c.name AS cityName, 
          u.complectName AS lastEditFrom, 
          ewe.timeLastEdit
        FROM employee_work_exp ewe
        INNER JOIN users u ON ewe.id_user = u.id
        INNER JOIN orgazizations o ON ewe.id_org = o.id
        INNER JOIN regions r ON o.region = r.id
        INNER JOIN cities c ON o.city = c.id;
      `;
      queryParams = [];
    } else {
      dataQuery = `
        SELECT 
          ewe.id, 
          u.complectName AS userName, 
          ewe.dateCreate, 
          ewe.disabled, 
          ewe.lastEditFrom, 
          ewe.timeLastEdit, 
          o.name_of_organization AS orgName, 
          r.name AS regionName, 
          c.name AS cityName, 
          u.complectName AS lastEditFrom, 
          ewe.timeLastEdit
        FROM employee_work_exp ewe
        INNER JOIN users u ON ewe.id_user = u.id
        INNER JOIN orgazizations o ON ewe.id_org = o.id
        INNER JOIN regions r ON o.region = r.id
        INNER JOIN cities c ON o.city = c.id
        WHERE u.authkey = ?;
      `;
      queryParams = [authkey];
    }

    connection.query(dataQuery, queryParams, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  });
});


app.listen(port, () => {
    console.log(`Сервер запущен на порту: ${port}`);
    console.log(`Используй: localhost:${port}/api/testServerApi`);
});