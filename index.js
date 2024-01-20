const express = require('express')
const dbPool = require('./src/connection/index')
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')
const app = express()
const port = 3000

//sequealize
const { development } = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('Sequelize')
const SequelizePool = new Sequelize(development)

//tes database
dbPool.connect((err) => {
  if (err) {
    console.log(err.message)
  } else {
    console.log("Database connected");
  }
})

//handlebaras
app.set('view engine', 'hbs')
app.set('views', 'src/views')
app.use('/assets', express.static('src/assets'))
app.use(express.urlencoded({ extended: false }))

// function
function getCurrentDateTime() {
  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString('en-GB')
  const formattedTime = currentDate.toLocaleTimeString('en-GB', { hour12: false })
  const formattedDateTime = `${formattedDate} ${formattedTime}`
  return formattedDateTime
}
function getDistanceTime(timePost) {
  const currentTime = new Date()
  const postTime = new Date(timePost)

  const timeDifference = currentTime - postTime
  const seconds = Math.floor(timeDifference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`
  } else if (minutes < 60) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`
  } else if (hours < 24) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`
  } else {
    return days === 1 ? "1 day ago" : `${days} days ago`
  }
}
setInterval(() => {
  const currentTime = new Date()
  data.forEach((project) => {
    project.distanceTime = getDistanceTime(project.originalTimePost, currentTime)
  })
}, 1000)
function calculateDateDifference(start, end) {
    let startDate = new Date(start)
    let endDate = new Date(end)

    if (startDate > endDate) {
        return alert ("Invalid input start date")
    }

    let timeDifference = endDate.getTime() - startDate.getTime()
    let daysDifference = timeDifference / (1000 * 60 * 60 * 24)

    if (daysDifference < 30) {
        return  daysDifference + " Hari" 
    } else if (daysDifference >= 30 && daysDifference % 30 == 0) {
        return  daysDifference / 30 + " Bulan"
    } else if (daysDifference >= 30 && daysDifference % 30 != 0) {
        return  Math.floor(daysDifference / 30) + " Bulan " + (daysDifference % 30) + " Hari" 
    } 
    return result
}

// middleware session
app.use(session({
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 2 * 60 * 60 * 1000
    },
    resave: false,
    store: session.MemoryStore(),
    secret: 'session_storage',
    saveUninnitialized: true
}))
app.use(flash())

app.get('/', home)
app.get('/contact', contact)
app.get('/my-project', my_project)
app.get('/project-page/:id', project_page)
app.get('/testimoni', testimoni)
app.post('/my-project', handlePostProject)
app.get('/delete/:id', handleDeleteProject)
app.get('/edit-project/:id', editProject)
app.post('/edit-project/:id', handleEditProject)
app.get('/register', formRegister)
app.post('/register', addRegister)
app.get('/login', formLogin)
app.post('/login', isLogin)
app.get('/logout', handleLogout)


const data = []

async function home(req, res) {
  try {
    const query = await SequelizePool.query('SELECT * FROM projects', {type: QueryTypes.SELECT})
    const data = query.map(res => ({
      ...res,
      author: 'Reza',
      image: './src/assets/image/background.jpg',
      isLogin: req.session.isLogin,
    }))

    res.render('index', {
      data,
      isLogin: req.session.isLogin,
      user: req.session.user
    })
  }   catch (error) {
        throw error
    }
}

function contact(req, res) {
  try {
      res.render('contact', {
      data,
      isLogin: req.session.isLogin,
      user: req.session.user
    })
   }   catch (error) {
        throw error
    }
}

function my_project(req, res) {
  try {
      res.render('my-project', {
      data,
      isLogin: req.session.isLogin,
      user: req.session.user
    })
    } catch (error) {
      throw error
    }
}

async function project_page(req, res) {
  try {
      const { id } = req.params
      const dataDetail = await SequelizePool.query(`SELECT * FROM projects WHERE id = ${id} `);
      res.render('project-page', {
      data:dataDetail[0][0],
      isLogin: req.session.isLogin,
      user: req.session.user
    })
    } catch (error) {
      throw error
    }
}

function testimoni(req, res) {
  try {
      res.render('testimoni', {
      data,
      isLogin: req.session.isLogin,
      user: req.session.user
    })
    } catch (error) {
      throw error
    }
}

async function handlePostProject(req, res) {
  const { title, content, 'start-date': startDate, 'end-date': endDate, tech} = req.body
  const duration = calculateDateDifference(startDate, endDate);

  await SequelizePool.query(`INSERT INTO projects (title, start_date, end_date, description, technologies, "createdAt", "updatedAt", duration) VALUES ('${title}', '${startDate}', '${endDate}', '${content}', '{${tech}}', NOW(), NOW(), '${duration}')`);

  res.redirect('/#home');
}


async function handleDeleteProject(req, res) {
  const { id } = req.params
  const data = await SequelizePool.query (`DELETE FROM projects where id = '${id}' `)
  res.redirect('/#home')
}

async function editProject(req, res) {
  try {
      const { id } = req.params;
      const editData = await SequelizePool.query(`SELECT * FROM projects where id = '${id}'`);
      res.render('edit-project', {
      data: editData[0][0],
      isLogin: req.session.isLogin,
      user: req.session.user
    })
    } catch (error) {
      throw error
    }
}


async function handleEditProject(req, res) {
  const { id } = req.params
  const { title, content, 'start-date': startDate, 'end-date': endDate, tech} = req.body
  const duration = calculateDateDifference(startDate, endDate);

  await SequelizePool.query(
    `UPDATE projects SET title='${title}', start_date='${startDate}', end_date='${endDate}', description='${content}', technologies='{${tech}}', "updatedAt"= now(), duration='${duration}' WHERE id = ${id}`);

  res.redirect('/#home')
}

function formRegister(req, res) {
    res.render('register')
}

async function addRegister(req, res) {
    try {
        const { name, email, password } = req.body
        const salt = 10

        bcrypt.hash(password, salt, async (err, hashPasword) => {
            await SequelizePool.query(`INSERT INTO users (name, email, password, "createdAt", "updatedAt") VALUES ('${name}','${email}','${hashPasword}', NOW(), NOW())`)
        })
        res.redirect('/login')
    } catch (error) {
        console.log(error);
    }
}

function formLogin(req, res) {
    res.render('login')
}

async function isLogin(req, res) {
    try {
        const { email, password } = req.body

        const checkEmail = await SequelizePool.query(`SELECT * FROM users WHERE email = '${email}'`, { type: QueryTypes.SELECT })

        if(!checkEmail.length) {
            req.flash('failed', 'Email is not register');
            return res.redirect('/login')
        }

        bcrypt.compare(password, checkEmail[0].password, function(err, result) {
            if(!result) {
                return res.redirect("/login")
            } else {
                req.session.isLogin = true
                req.session.user = checkEmail[0].name
                req.flash('success', 'Welcome to mobile legend');
                return res.redirect('/')
            }
        });
    } catch (error) {
        console.log(error);
    }
}

function handleLogout(req, res){
  req.session.isLogin = false
  req.session.user = null

  res.redirect('/')
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})