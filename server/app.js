require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bcrypt = require('bcrypt');
const { User } = require('./db/models');
const { Task } = require('./db/models');


const app = express();
const PORT = process.env.DB_PORT || 3005;


const sessionConfig = {
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: false,
  saveUninitialized: false,
  store: new FileStore(),
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

app.use(cors({
  credentials: true,
  origin: true,
}))
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(session(sessionConfig));
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.post('/registration', async (req, res) => {
  try {
  const {name, email, number, password} = req.body;
  const hashPass = await bcrypt.hash(password, 10);
  const user = await User.findOne({where: { email }})
  if (!user) {
    const newUser = await User.create({name, email, number, password: hashPass});
    req.session.user = {id: newUser.id, name: newUser.name};
    return res.json(req.session.user);
  } res.status(500).json({message: 'Такой пользователь уже существует!'})
  } catch (error) {
    res.status(500).json({message: 'Такой пользователь уже существует!'})
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    const checkPass = await bcrypt.compare(password, user.password);
    if (checkPass) {
      req.session.user = { id: user.id, name: user.name };
      return res.json(user);
    }
    return res.status(400).json({ message: 'email or password is not correct' });
  }
  return res.status(401).json({ message: 'this user is not founded' });
});

app.get('/logout', async (req, res) => {
  try {
    res.clearCookie('user_id');
    req.session.destroy();
    res.sendStatus(200);
  } catch (error) {
    return res.status(400).end();
  }
});

app.get('/task/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const fixId = id.replace(/:/g, '')
    const task = await Task.findByPk(+fixId);
    res.json(task);
  }
  catch (error) {
    return res.status(400).end();
  }
})

app.post('/task', async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.session.user.id;
    const result = await Task.create({ title, user_id: userId });
    res.json(result);
  } catch (error) {
    res.status(400);
  }
  
});

app.post('/allTasks', async (req, res) => {
  try {
    const { id } = req.body
    const task = await Task.findAll({where: {user_id: id}, order:[['id', 'ASC']]});
    res.json(task);
  } catch (error) {
    return res.status(400).end();
  }
});

app.post('/doneTasks', async (req, res) => {
  try {
    const { id } = req.body
    const task = await Task.findAll({where: {user_id: id, isDone: true}});
    res.json(task);
  } catch (error) {
    return res.status(400).end();
  }
});

app.post('/undoneTasks', async (req, res) => {
  try {
    const { id } = req.body
    const task = await Task.findAll({where: {user_id: id, isDone: false || null}});
    res.json(task);
  } catch (error) {
    return res.status(400).end()
  }
});

app.put('/done/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const important = await Task.findOne({ where: { id: +id } });
    const result = await important.update({ isDone: true });
    res.json(result);
  } catch (error) {
    return res.status(400).end()
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Task.destroy({ where: { id: +id } });
    res.json(result);
  } catch (error) {
    return res.status(400).end()
  }
});

app.put('/change/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const fixId = id.replace(/:/g, '')
    const result = await Task.update({title: text}, { where: {id: +fixId}});
    res.json(result)
  } catch (error) {
    res.status(400);
  }
})

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Your server is working ${PORT}`));
  } catch (error) {
    console.log(error)
  }
}

start()
