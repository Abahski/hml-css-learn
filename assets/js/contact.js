function validateForm() {
    var form = document.getElementById('contactForm');
    var phoneInput = document.getElementById('phone_number');
    var phoneError = document.getElementById('phoneError');
    var emailInput = document.getElementById('email');
    var emailError = document.getElementById('emailError');

    if (form.checkValidity()) {
        var phoneNumber = phoneInput.value;
        if (!/^[0-9]+$/.test(phoneNumber)) {
            phoneError.textContent = 'Phone number must only contain numeric characters.';
            return false;
        } else {
            phoneError.textContent = '';
        }

        var email = emailInput.value;
        if (!/\.(com|co\.id|net|org)$/.test(email)) {
            emailError.textContent = 'Email address must end with a valid TLD (e.g., .com, .co.id, .net, .org)';
            return false;
        } else {
            emailError.textContent = '';
        }

        submitData();
    }
    form.classList.add('was-validated');
    return false;
}

function submitData() {
    const nama = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const nomor = document.getElementById('phone_number').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

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
