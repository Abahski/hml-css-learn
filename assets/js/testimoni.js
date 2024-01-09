const testimonials = [
    {
        author: "Reza Liswara",
        content: "Slow respon euy",
        image: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: 1
    },
    {
        author: "Reza",
        content: "Fast Respon tapi hasilnya jelek banget",
        image: "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 2,
    },
    {
        author: "Liswara",
        content: "Ga bagus dan ga jelek sih hasilnya, oke untuk yang mau coba",
        image: "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 3,
    },
    {
        author: "RL",
        content: "Meski agak slow respon hasilnya memuaskan bangett",
        image: "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4
    },
    {
        author: "Orang baru",
        content: "Recommend banget buat siapapun heheheh",
        image: "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 5
    }
]

function allTestimonial() {
    const testimonialHTML = testimonials.map((value) => {
        return `<div class="testimonial">

        <img src="${value.image}" class="profile-testimonial" />
                <p class="quote">"${value.content}"</p>
                <p class="author">- ${value.author}</p>
            </div>`
    })
    
    document.getElementById("testimonials").innerHTML = testimonialHTML.join(" ")
}

function filterTestimonial(rating) {
    const filteredTestimonial = testimonials.filter((value) => value.rating === rating)
    const filteredTestimonialHTML = filteredTestimonial.map((value) => {
        return `<div class="testimonial"> 
        <img src="${value.image}" class="profile-testimonial" />
                <p class="quote">"${value.content}"</p>
                <p class="author">- ${value.author}</p>
            </div>`
    })
    document.getElementById("testimonials").innerHTML = filteredTestimonialHTML.join(" ")
}

allTestimonial()