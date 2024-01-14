function getTestimoniData() {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()

		xhr.open("GET", "https://api.npoint.io/dfeeadc475c524a31b22", true)
		xhr.onload = () => {
			if (xhr.status === 200) {
				const response = JSON.parse(xhr.responseText)
				resolve(response)
			} else {
				reject('Error loading data')
			}
		}

		xhr.onerror = () => {
			reject("Network Error!")
		}

		xhr.send()
	})
}

async function allTestimonial() {
	document.getElementById("testimonials").innerHTML = "Now Loading"
	const testimonials = await getTestimoniData()

	let testimonialsHTML = ""

	testimonials.forEach((value) => {
		testimonialsHTML += `<div class="testimonial">
		<img src= "${value.image}" class="profile-testimonial" />
		<p class="quote">"${value.content}"</p>
		<p class="author">- ${value.author}</p>
		</div>`
	})
	document.getElementById("testimonials").innerHTML = testimonialsHTML
}

async function filterTestimonial(rating) {
	document.getElementById("testimonials").innerHTML = "Now Loading"
	const testimonials = await getTestimoniData()

	const filteredTestimonial = testimonials.filter((value) => value.rating === rating)

	if (!filteredTestimonial.length) {
		return document.getElementById("testimonials").innerHTML = "<h1>Data not found!</h1>"
	}

	let filteredTestimonialHTML = ""

	filteredTestimonial.forEach((value) => {
		filteredTestimonialHTML += `<div class="testimonial">
		<img src= "${value.image}" class="profile-testimonial" />
		<p class="quote">"${value.content}"</p>
		<p class="author">- ${value.author}</p>
		</div>`
	})
	document.getElementById("testimonials").innerHTML = filteredTestimonialHTML
}

allTestimonial()