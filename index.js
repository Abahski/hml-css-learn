const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'hbs')
app.set('views', 'src/views')
app.use('/assets', express.static('src/assets'))
app.use(express.urlencoded({ extended: false }))

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
        return "Invalid input start date"
    }

    let timeDifference = endDate.getTime() - startDate.getTime()
    let daysDifference = timeDifference / (1000 * 60 * 60 * 24)

    if (daysDifference < 30) {
        return "Durasi: " + daysDifference + " Hari" 
    } else if (daysDifference >= 30 && daysDifference % 30 == 0) {
        return "Durasi: " + daysDifference / 30 + " Bulan"
    } else if (daysDifference >= 30 && daysDifference % 30 != 0) {
        return "Durasi: " + Math.floor(daysDifference / 30) + " Bulan " + (daysDifference % 30) + " Hari" 
    } 
    return result
}

app.get('/', home)
app.get('/contact', contact)
app.get('/my-project', my_project)
app.get('/project-page/:id', project_page)
app.get('/testimoni', testimoni)
app.post('/my-project', handlePostProject)
app.get('/delete/:id', handleDeleteProject)
app.get('/edit-project/:id', editProject)
app.post('/edit-project/:id', handleEditProject)

const data = []

function home(req, res) {
  res.render('index')
}

function contact(req, res) {
  res.render('contact')
}

function my_project(req, res) {
  res.render('my-project', { data })
}

function project_page(req, res) {
  const { id } = req.params

  const dataDetail = data[id]

  res.render('project-page', { data: dataDetail })
}

function testimoni(req, res) {
  res.render('testimoni')
}

function handlePostProject(req, res) {
  const { title, content, 'start-date': startDate, 'end-date': endDate, tech} = req.body
  const date = getCurrentDateTime()
  const timePost = new Date()
  const originalTimePost = new Date(timePost)
  const distanceTime = getDistanceTime(originalTimePost)
  const duration = calculateDateDifference(startDate, endDate);

  const newProject = {
    title,
    content,
    date,
    timePost,
    originalTimePost,
    distanceTime,
    duration,
    tech: Array.isArray(tech) ? tech : [tech]
  };

  data.unshift(newProject);

  console.log();
  console.log('judul', title);
  console.log('konten', content);
  console.log('date', date);
  console.log(data);
  console.log();

  res.redirect('/my-project');
}


function handleDeleteProject(req, res) {
  const { id } = req.params

  data.splice(id, 1)
  console.log('berhasil delete project id ', id)
  res.redirect('/my-project')
}

function editProject(req, res) {
    const { id } = req.params;
    const dataDetail = data[id];

    res.render("edit-project", { data: dataDetail, id, startDate: dataDetail.startDate, endDate: dataDetail.endDate, duration: dataDetail.duration });
}


function handleEditProject(req, res) {
  const { id, title, content, 'start-date': startDate, 'end-date': endDate, tech} = req.body
  const newDate = getCurrentDateTime()
  const originalProject = data[id]

  if (originalProject) {
    const { date, timePost, originalTimePost } = originalProject
    const editTimePost = new Date()
    const editTime = getCurrentDateTime(editTimePost)
    const distanceTime = getDistanceTime(originalTimePost)
    const duration = calculateDateDifference(startDate, endDate);

    data[id] = {
      title,
      content,
      date: originalProject.date,
      timePost: editTimePost,
      originalTimePost,
      editTime,
      distanceTime,
      startDate,
      endDate,
      duration,
      tech: Array.isArray(tech) ? tech : [tech]
    }

    console.log("edited ", id);
    console.log(data[id]);
  } else {
    console.log("Project not found");
  }

  res.redirect('/my-project');
}





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})