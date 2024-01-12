const projects = [{
    title: "Testing",
    project_description: "halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo vhalo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo halo ",
    start_date:"2024-01-17" ,
    end_date:"2024-01-30" ,
    image: "https://static.wikia.nocookie.net/naruto/images/d/d6/Naruto_Part_I.png/revision/latest/scale-to-width-down/1200?cb=20210223094656",
    nodejs: true,
    css: true,
    html: true,
    python: true,
    createdAt: new Date()
}]

function addProject(e) {
	e.preventDefault()

	const title = document.getElementById("input-project-name").value
	const start_date = document.getElementById("input-start-date").value
	const end_date = document.getElementById("input-end-date").value
	const project_description = document.getElementById("input-project-description").value
	const nodejs = document.getElementById("nodejs").checked
    const python = document.getElementById("python").checked
    const html = document.getElementById("html").checked
    const css = document.getElementById("css").checked
    let image = document.getElementById('input-image').files

    let startDate = new Date(start_date).getTime()
    let endDate = new Date(end_date).getTime()

    if (startDate > endDate) {
        return alert("Start Date tidak boleh lebih lama dari End Date.")
    }

    let tech = []

    for (let x = 0; x < tech.length; x++) {
    	if (tech[x].checked) {
    		tech.push(tech[x].value)
    	}
    }

    image = URL.createObjectURL(image[0])
    // console.log(imageLink)

    const createdAt = new Date

    const project = {
    	title,
    	project_description,
    	nodejs,
    	python,
    	html,
    	css,
    	image,
    	createdAt,
        start_date,
        end_date
    }

    projects.unshift(project)
    renderProject()

    console.log("Projects", projects)
}

function renderProject() {
	let html = '<h1 class="project-title">Project List</h1>'

	for (let index = 0; index < projects.length; index++) {
        let renderTechIcons = ''

        if (projects[index].nodejs) {
            renderTechIcons += `<i class="tech-icon fa-brands fa-node"></i>`
        }

        if (projects[index].python) {
            renderTechIcons += `<i class="tech-icon fa-brands fa-python"></i>`
        }

        if (projects[index].html) {
            renderTechIcons += `<i class="tech-icon fa-brands fa-html5"></i>`
        }

        if (projects[index].css) {
            renderTechIcons += `<i class="tech-icon fa-brands fa-css3-alt"></i>`
        }

		html += `
        <div class="project-list-item position-relative">
        	<div class="project-image">
        		<img src="${projects[index].image}" alt="" class="img-fluid" />
            </div>
            <div class="project-content">
                    
            	<h1>
                	<a href="project page.html" target="_blank">${projects[index].title}</a>
            	</h1>
            	<div class="detail-project-content">
                    ${calculateDateDifference(projects[index].start_date, projects[index].end_date)} | ${getFullTime(projects[index].createdAt)} | Reza Liswara 
                </div>
                <div class="tech-icon-container">
                    ${renderTechIcons}
                </div>
                <p style="width: 100%">
                  ${projects[index].project_description}
                </p>
                <div class="btn-group position-absolute top-0 end-0 m-3">
                        <button class="btn-edit me-2">Edit</button>
                        <button class="btn-post">Delete</button>
                </div>
                <div> 
                     <p style="width: 100%">${getDistanceTime(projects[index].createdAt)}</p>
                </div>  
            </div>
        </div>
		`
	}

	document.getElementById("contents").innerHTML = html
}

function getFullTime(dates) {
    let minutes = dates.getMinutes()
    let hours = dates.getHours()
    const date = dates.getDate()
    const month = dates.getMonth();
    const year = dates.getFullYear();

    if (hours < 10) {
        hours = "0" + hours
    }

    if (minutes < 10) {
        minutes = "0" + minutes
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    return `${date} ${months[month]} ${year} ${hours}:${minutes} WIB`;
}

function getDistanceTime(timePost) { 
    let timeNow = new Date()

    let distance = timeNow - timePost

    const seconds = Math.floor(distance / 1000)
    const minutes = Math.floor(distance / 1000 / 60)
    const hours = Math.floor(distance / 1000 / 60 / 60)
    const day = Math.floor(distance / 1000 / 60 / 60 / 24)

    if (seconds < 60) {
        return "Uploaded " + seconds + " seconds ago"
    } else if (minutes < 60) {
        return "Uploaded " + minutes + " minutes ago"
    } else if (hours < 60) {
        return "Uploaded " + hours + " hours ago"
    } else if (day < 24) {
        return  "Uploaded " + day + " day ago"
    }
}

function calculateDateDifference(start, end) {
    let startDate = new Date(start)
    let endDate = new Date(end)

    let timeDifference = endDate.getTime() - startDate.getTime()
    let daysDifference = timeDifference / (1000 * 60 * 60 * 24)

    if (daysDifference < 30) {
        return "Durasi: " + daysDifference + " Hari" 
    } else if (daysDifference >= 30 && daysDifference % 30 == 0) {
        return "Durasi: " + daysDifference / 30 + " Bulan"
    } else if (daysDifference >= 30 && daysDifference % 30 != 0) {
        return "Durasi: " + Math.floor(daysDifference / 30) + " Bulan " + (daysDifference % 30) + " Hari" 
    } 
}

renderProject()

setInterval(() => {
    renderProject()
}, 1000)