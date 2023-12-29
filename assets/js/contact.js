function submitData () {
const nama = document.getElementById('nama').value
const email = document.getElementById('email').value
const nomor = document.getElementById('nomor').value
const subject = document.getElementById('subject').value
const message = document.getElementById('message').value

if (name === "" && email === "" && nomor === "" && subject === "" && message === "") {
    return alert("Anda belum mengisi apa-apa. Mohon mengisi formulir.");
}

if(nama == ""){
    return alert("Nama tidak boleh kosong.")
}
else if(email == ""){
    return alert("Email tidak boleh kosong.")
}
else if(nomor == ""){
    return alert("Nomor telepon tidak boleh kosong.")
}
else if(subject == ""){
    return alert("Silahkan pilih subjek.")
}
else if(message == ""){
    return alert("Silahkan masukkan pesan Anda.")
}

console.log(nama)
console.log(email)
console.log(nomor)
console.log(message)
console.log(subject)


let a = document.createElement('a')

a.href = `mailto:${email}?subject=${subject}&body=${message}, saya ${nama}, kontak saya di ${nomor}`

a.click()
}


