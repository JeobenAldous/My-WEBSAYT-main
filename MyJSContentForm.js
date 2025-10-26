const scriptURL = 'https://script.google.com/macros/s/AKfycbwhMMkkhFI8oie6r21znB03OWDua_t2cIhDJZbbXh52bU9N6XGGSaSd9Ttpbtkzm4Nazw/exec';
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML = "Message sent successfully"
        setTimeout(function(){
            msg.innerHTML = ""
        },5000)
        form.reset()
   })})
    .catch(error => console.error('Error!', error.message))