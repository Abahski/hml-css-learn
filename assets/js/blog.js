function addBlog(e) {
    e.preventDefault()

    const title = document.getElementById("input-blog-title").value
    const content = document.getElementById("input-blog-content").value
    const image = document.getElementById("input-blog-image").files

    const imageLink = URL.createObjectURL(image[0])

    console.log("title", title)
    console.log("content", content)
    console.log("image", )
}