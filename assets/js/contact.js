function submitData() {
    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const nomor = document.getElementById('nomor').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (nama === "" && email === "" && nomor === "" && subject === "" && message === "") {
        return alert("Anda belum mengisi apa-apa. Mohon mengisi formulir.");
    }

    if (nama === "") {
        return alert("Nama tidak boleh kosong.");
    } else if (email === "") {
        return alert("Email tidak boleh kosong.");
    } else if (nomor === "") {
        return alert("Nomor telepon tidak boleh kosong.");
    } else if (subject === "") {
        return alert("Silahkan pilih subjek yang ingin digunakan.");
    } else if (message === "") {
        return alert("Silahkan masukkan pesan Anda.");
    }

    console.log(nama);
    console.log(email);
    console.log(nomor);
    console.log(message);
    console.log(subject);

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${message}, saya ${nama}, kontak saya di ${nomor}`)}`;
    
    const link = document.createElement('a');
    link.href = mailtoLink;
    link.target = '_blank'; 
    link.click();
}
