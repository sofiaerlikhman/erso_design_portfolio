const serviceID = 'service_j5vrycb';
const templateID = 'template_l7x18zd';
const form = document.getElementById('my-form');

form.addEventListener("submit", handleSubmit);

async function handleSubmit(evt) {
    evt.preventDefault();
    const status = document.getElementById("modal-form-status");
    const labelForm = document.getElementById("form-label");

    const params = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };

    form.style.display = "none";
    labelForm.innerHTML = 'Thank you!'
    status.innerHTML = "The first step towards your design is done. I`ll reach out to you as soon as possible.";
    status.style.display = 'block';
    

    emailjs.send(serviceID, templateID, params).then((res) => {
        console.log(res);
    }).catch((err) => { console.log(err) })
    
    evt.currentTarget.reset();
}