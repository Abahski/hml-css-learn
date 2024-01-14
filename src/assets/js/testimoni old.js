class Testimonial {
    #author = ""
    #image = ""
    #content = ""

    constructor(author, image, content) {
        this.#author = author
        this.#image = image
        this.#content = content
    }

    set author(val) {
        this.#author = val
    }

    set image(val) {
        this.#image = val
    }

    set content(val) {
        this.#content = val
    }

    get author() {
        return this.#author
    }

    get image() {
        return this.#image
    }

    get content() {
        return this.#content
    }

    html() {
        throw new Error('You must choose as author or company')
    }
}

class AuthorTestimonial extends Testimonial {

    html() {
        return `<div class="testimonial">
            <img src="${this.image}" class="profile-testimonial" />
            <p class="quote">"${this.content}"</p>
            <p class="author">- ${this.author}</p>
        </div>`
    }
}

class CompanyTestimonial extends Testimonial {

    html() {
        return `<div class="testimonial">
            <img src="${this.image}" class="profile-testimonial" />
            <p class="quote">"${this.content}"</p>
            <p class="author">- ${this.author} Company</p>
        </div>`
    }
}

const testimonial1 = new AuthorTestimonial("Abah Abahski", "assets/img/background.jpg", "Joki di tempat sini sangat worth it sekali guyssss")
const testimonial2 = new AuthorTestimonial("Liswara Reza", "assets/img/dumbways.png", "Joki paling murah ya ada di sini sajaa gaess!")
const testimonial3 = new CompanyTestimonial("RL", "assets/img/Foto Reza.jpg", "Okelah bang pengerjaan sangat cepat sekalii! ^^")

const testimonials = [testimonial1, testimonial2, testimonial3]
let testimonialsHTML = ""

for (let index = 0; index < testimonials.length; index++) {
    testimonialsHTML += testimonials[index].html()
}

document.getElementById("testimonials").innerHTML = testimonialsHTML