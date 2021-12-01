const res_usersMenu = document.querySelector('.res_allUsers');
const res_usersMenuHideBtn = document.querySelector('.searchBarHide_btn');
const res_settingMenu = document.querySelector('.res_settingOption');

function resShowUserList(){
  res_usersMenu.classList.add('res_allUsers_show');
}

function resHideUserList(){
  res_usersMenu.classList.remove('res_allUsers_show');
}

function reloadPage(){
  location.reload();
}

function resSettingMenuShow(){
  res_settingMenu.classList.toggle('show');
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('res_settingOption') === false && e.target.classList.contains('settingIcon') === false) {
    res_settingMenu.classList.remove('show');
  }
})




//res_search functionality
let res_typingTimer;
const res_fetchDuration = 500;
const res_searchInputFild = document.getElementById('res_searchUsersInput');
const res_allUserList = document.querySelector('.res_userList_container');
const res_serchError = document.querySelector('.res_searchError');

res_searchInputFild.addEventListener("keyup", function () {
    clearInterval(res_typingTimer);
    if (res_searchInputFild.value) {
      res_typingTimer = setTimeout(resSearch, res_fetchDuration);
    }
});

res_searchInputFild.addEventListener("keydown", function () {
clearInterval(res_typingTimer);
});

function resSearch (){
    fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({
          user: res_searchInputFild.value,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.errors) {
            res_serchError.style.display = "block";
            res_serchError.innerHTML = `<p>${data.errors.msg}</p>`;
          } else {
            res_serchError.style.display = "none";
  
            let usersHtml = "<ul class='res_usersList'>";
            data.user.forEach((element) => {
              if (element._id !== loginUserId) {
                  usersHtml += `<li><div onclick="createConversation('${element._id}', '${element.name}', '${element.avatar}')">
                  <img src="uploads/avatar/${element.avatar ? element.avatar : "blank.png"}" alt="..." />
                  <div class="res_userSingleInfo">
                  <h4>${element.name}</h4>
                  <span>New Conversation</span>
                  </div>
                </div></li>`;
            //     usersHtml += `<div onclick="createConversation('${
            //       element._id
            //     }', '${element.name}', '${
            //       element.avatar
            //     }')" class="singleChatUser">
            //   <img src="uploads/avatar/${
            //     element.avatar ? element.avatar : "blank.png"
            //   }" alt="single user images" />
            //     <div class="userInfo">
            //     <h4>${element.name}</h4>
            //     </div>
            //     </div>`;
              }
            });
            usersHtml += "</ul>";
            res_allUserList.innerHTML = usersHtml;
          }
        }).catch((err) => {
            console.log(err);
        })
}