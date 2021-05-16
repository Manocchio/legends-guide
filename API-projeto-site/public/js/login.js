let video = document.querySelector('#login-video');
video.volume = 0.1;
let userInput = document.querySelector('#name');
let passwordInput = document.querySelector('#password');

let filled = {
    user: false,
    pass: false,
}



logar = () => {
    sessionStorage.clear();
    let summoner = userInput.value;

    fetch(`summoner/getSummoner/${summoner}`, {
        method: 'GET',
    }).then((response) => {
        if (response.ok) {
            response.json().then(async (data) => {
                let userInfo = await data.summoner;
                sessionStorage.setItem('user', JSON.stringify(userInfo));
                window.location = 'index.html';
            });
        } else {
            console.log('Esse usuário não existe')
        }
    });


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

