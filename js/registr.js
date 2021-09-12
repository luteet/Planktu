
let user, avatar;

let profileSettings = document.querySelector('.profile'),
    profileList = document.querySelector('.profile__list'),
    profileName = document.querySelector('.profile__name'),
    profileBtn = document.querySelector('.profile__btn--main'),
    profileAvatar = document.querySelector('.profile__avatar'),
    avatarRemoveBtn = document.querySelector('.avatar-remove');
    accountList = document.querySelector('.header__account--list'),
    accountBtn = document.querySelector('.header__account--list-btn');

function avatarImage(avatar) {
    let avatarImg = document.createElement('img')
    
    if(profileAvatar) {
        document.body.removeChild(profileAvatar);
    }
    
    

    avatarImg.src = avatar;
    avatarImg.classList.add('profile__avatar');


    
    profileBtn.appendChild(avatarImg)
    profileBtn.classList.add('_avatar-mode');
}

function reloadPage() {
    location.hash = ""
    history.replaceState("", "", location.pathname);

    location.reload();
}

function error(elem, errorText) {
    let errorSpan = document.createElement('span');
        errorSpan.classList.add('popup-form-error');

        errorSpan.innerHTML = errorText;

        elem.parentElement.appendChild(errorSpan);
        elem.classList.add('_error');

        elem.addEventListener('input', function() {
            elem.classList.remove('_error');
            
            if(errorSpan) {
                errorSpan.parentElement.removeChild(errorSpan);
                errorSpan = '';
            }
            
        });
}

    if(localStorage['user']) {
        user = localStorage['user'];
    }
    if(localStorage['avatar-' + user]) {
        avatar = localStorage['avatar-' + user];
    
        avatarImage(avatar);

        avatarRemoveBtn.classList.add('_avatar-mode');
    }



document.querySelector('.sign-up__form').addEventListener('submit', function(e) {
    e.preventDefault();

    let login = document.querySelector('.sign-up-name').value,
        password = document.querySelector('.sign-up-password').value;
    
    localStorage['password' + '-' + login] = password;
    localStorage['login' + '-' + login] = login;
    localStorage['user'] = login;


    reloadPage();

    
});



document.querySelector('.sign-in__form').addEventListener('submit', function(e) {
    e.preventDefault();

    let login = document.querySelector('.sign-in-name'),
        password = document.querySelector('.sign-in-password');

    

    if(localStorage['login-' + login.value] == login.value) {
        if(localStorage['password-' + login.value] == password.value) {
            localStorage['user'] = login.value;

            reloadPage();
        } else {

            error(password, 'Неправельный пароль');

        }
    } else {
        
        error(login, 'Пользователя с таким логином не существует');

    }
    
    

});


if(localStorage['user']) {
    profileSettings.classList.add('_active');
    accountList.classList.add('_user-active');
    accountBtn.classList.add('_user-active');

    profileName.innerHTML = localStorage['user'];
} else {
    
}

var fr = new FileReader();
document.querySelector('.profile-settings__item--avatar-input').onchange = function (evt) {
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;

    if (FileReader && files && files.length) {
        
        fr.onload = function () {
            
        }
        
        fr.readAsDataURL(files[0]);
        
    }

}


document.body.addEventListener('click', function (e) {
    

    if(e.target.classList.contains('avatar-submit')) {
        if(fr.result) {
            localStorage['avatar-' + user] = fr.result;

            reloadPage();
            
        }
    }

    if(e.target.classList.contains('profile__btn--sign-out')) {
        localStorage['user'] = '';
        reloadPage();
    }

    if(e.target.classList.contains('avatar-remove')) {
        localStorage['avatar-' + user] = '';
        reloadPage();
    }

    if(e.target.classList.contains('name-submit')) {
        let input = document.querySelector('.profile-settings__item--name-input');

        if(input.value) {
            if(!localStorage['login-' + input.value]) {
                localStorage['login-' + input.value] = input.value;
                localStorage['password-' + input.value] = localStorage['password-' + user];
                localStorage['avatar-' + input.value] = localStorage['avatar-' + user];

                localStorage.removeItem('login-' + user);
                localStorage.removeItem('password-' + user);
                localStorage.removeItem('avatar-' + user);

                localStorage['user'] = input.value;

                reloadPage();
            } else {
                error(input, 'Имя уже занятое');
            }
            
        } else {
            error(input, 'Поле пустое');
        }

        
    }

    if(e.target.classList.contains('password-submit')) {
        let input = document.querySelector('.profile-settings__item--password-input');

        if(input.value) {
            
            localStorage['password-' + user] = input.value;
            
            reloadPage();
            
        } else {
            error(input, 'Поле пустое');
        }

    }

});

