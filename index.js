const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'hbs')
app.set('views', 'src/views')
app.use('/assets', express.static('src/assets'))

app.get('/', home)
app.get('/contact', contact)
app.get('/my-project', my_project)
app.get('/project-page/:id', project_page)
app.get('/testimoni', testimoni)

function home(req, res) {
  res.render('index')
}

function contact(req, res) {
  res.render('contact')
}

function my_project(req, res) {
  const data = [
        {
            id: 1,
            title: "Data 1",
            content: "Content 1",
            image: 'assets/image/background.jpg'
        },
        {
            id: 2,
            title: "Data 2",
            content: "Content 2",
            image: 'assets/image/background.jpg'
        },
        {
            id: 3,
            title: "Data 3",
            content: "Content 3",
            image: 'assets/image/background.jpg'
        } 
    ]
  res.render('my-project', { data })
}

function project_page(req, res) {
  const { id } = req.params

  res.render('project-page', { id })
}

function testimoni(req, res) {
  res.render('testimoni')
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})