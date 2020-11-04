
// using fetch api
const form = document.querySelector('form');
const inputElement = document.querySelector('input')
const messageOne  = document.querySelector('#msg-1')
const messageTwo  = document.querySelector('#msg-2')
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const value = inputElement.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent =''
    fetch('/weather?address='+value).then((response)=>{
        response.json().then((data)=>{      // response.json parse json data to js object
            if(data.error){
                messageOne.textContent =data.error;
            }else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.foreacast;
            }
        })
    })
})