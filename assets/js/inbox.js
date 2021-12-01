const searchBar = document.querySelector('.chatSecrchBar input');
const settingBtn = document.querySelector('.settingIcon');
const settingMenu = document.querySelector('.settingOption');

searchBar.addEventListener('focus', (e) => {
    const parentDiv = e.target.parentElement;
    parentDiv.classList.add('chatSecrchBar-clickEfact');
})

searchBar.addEventListener('blur', (e) => {
    e.target.parentElement.classList.remove('chatSecrchBar-clickEfact');
})

// settingBtn.addEventListener('click', () => {
//     settingMenu.classList.toggle('show');
// })

function settingMenuShow(){
    settingMenu.classList.toggle('show');
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('settingOption') === false && e.target.classList.contains('settingIcon') === false) {
        settingMenu.classList.remove('show');
    }
})

// popup module js 
const module = document.querySelector('.module');
const moduleBody = document.querySelector('.moduleBody');
const crossBtn = document.querySelector('.crossBtn');
const addUserBtn = document.querySelector('.addUser');

// addUserBtn.addEventListener('click', () => {
//     module.classList.add('showModule');
//     moduleBody.classList.add('showModule');
// })

function addUserModleShow(){
    module.classList.add('showModule');
    moduleBody.classList.add('showModule');
}

// crossBtn.addEventListener('click', () => {
//     module.classList.remove('showModule');
//     moduleBody.classList.remove('showModule');
// })

function addUserModleClose(){
    module.classList.remove('showModule');
    moduleBody.classList.remove('showModule');
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('module') === true) {
        module.classList.remove('showModule');
        moduleBody.classList.remove('showModule');
    }
})

//modle js
const userAddForms = document.getElementById('addNewUserForm');
userAddForms.addEventListener('submit', (e) => {
    e.preventDefault();
    const addUserForm = document.getElementById('addNewUserForm');
    const formData = new FormData(addUserForm);
    fetch('/api/user',{
        method: 'POST',
        body: formData
    })
    .then((response) => response.json())
    .then(result => {
        if (result.errors) {
            Object.keys(result.errors).forEach(fildname => {
                toastifyAlert(result.errors[fildname].msg, ['#FFC107', '#FFC107']);
            })
        } else {
            toastifyAlert(result.msg, ['#00b09b', '#96c93d']);
            userAddForms.reset();
        }
    })
    .catch(err => console.log(err));
})

//toastifyAlert function
function toastifyAlert(msg, colors){
    Toastify({
        text: msg,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
        }
      }).showToast();
}

//logout user
const logoutAlert = Toastify({
    text: "Your are being logout.",
    duration: 1000,
    position: "left"
  })

function logout() {
    fetch('/', {
        method: 'DELETE'
    })
    logoutAlert.showToast();
    setTimeout(() =>{
        window.location.replace('/');
    }, 1000)
}