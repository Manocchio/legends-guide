
let video = document.querySelector('#login-video');
video.volume = 0.1;
let userInput = document.querySelector('#name');
let passwordInput = document.querySelector('#password');

let filled = {
    user: false,
    pass: false,
}




invalidate = (field, input, message) => {
    document.querySelector(field).classList.add('invalid');
    document.querySelector(input).value = '';
    document.querySelector(input).placeholder = message;
    setTimeout(() => {
        document.querySelector(field).classList.toggle('invalid');
        document.querySelector(input).placeholder = '';
        if (document.querySelector(input).value == '') {
            document.querySelector(input).nextElementSibling.classList.remove('focused');
        }

    }, 5000);
}



logar = () => {
    sessionStorage.clear();
    let summoner = userInput.value;


    let form = new URLSearchParams(new FormData(formLogin))
    fetch('usuarios/autenticar', {
        method: 'POST',
        body: form,
    }).then((response) => {
        if (response.ok) {
            response.json().then(async (data) => {
                let userInfo = await data;

                sessionStorage.setItem('user', JSON.stringify(userInfo));
                window.location = 'index.html';
            })
        } else {
            invalidate('#nameField', '#name', 'Usuário ou senha Inválidos');
            filled.user = false;
            invalidate('#passField', '#password', 'Usuário ou senha Inválidos');
            filled.pass = false;

            checkFilled();

        }
    })




}


const checkFilled = () => {
    if (filled.user && filled.pass) {
        document.querySelector('#submitBtn').classList.add('filled');
        document.querySelector('#submitBtn').addEventListener('click', logar, true)
    } else {
        if (document.querySelector('#submitBtn').classList.contains('filled')) {

            document.querySelector('#submitBtn').classList.remove('filled');
            document.querySelector('#submitBtn').removeEventListener('click', logar, true)

        }
    }
}

userInput.addEventListener('change', function () {
    if (this.value != '') {
        this.nextElementSibling.classList.add('focused');
    } else {
        this.nextElementSibling.classList.remove('focused');
    }
});


passwordInput.addEventListener('change', function () {
    if (this.value != '') {
        this.nextElementSibling.classList.add('focused');
    } else {
        this.nextElementSibling.classList.remove('focused');
    }
});

userInput.addEventListener('keyup', function () {
    if (this.value != '') {
        filled.user = true;
    } else {
        filled.user = false;
    }

    checkFilled();
});


passwordInput.addEventListener('keyup', function () {
    if (this.value != '') {
        filled.pass = true;
    } else {
        filled.pass = false;
    }


    checkFilled();

});


document.querySelector('#mute').addEventListener('click', function () {
    if (video.muted) {
        video.muted = false;
        this.children[0].classList.toggle('muted');
    } else {
        video.muted = true;
        this.children[0].classList.toggle('muted');

    }
})

