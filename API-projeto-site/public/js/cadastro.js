
typeWriter = (elemento) => {
    const textoArray = elemento.innerHTML.split('');
    elemento.innerHTML = '';
    textoArray.forEach((letra, i) => {
        setTimeout(() => {
            elemento.innerHTML += letra;
        }, 250 * i);
    })
}


const title = document.querySelector('.toWrite');

typeWriter(title);


let userInput = document.querySelector('#name');
let passwordInput = document.querySelector('#password');
let confirmPassInput = document.querySelector('#confirmPassword');

let filled = {
    user: false,
    pass: false,
    confirmPass: false,
}



cadastrar = () => {
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
    if (filled.user && filled.pass && filled.confirmPass) {
        document.querySelector('#submitBtn').classList.add('filled');
        document.querySelector('#submitBtn').addEventListener('click', cadastrar, true)
    } else {
        if (document.querySelector('#submitBtn').classList.contains('filled')) {

            document.querySelector('#submitBtn').classList.remove('filled');
            document.querySelector('#submitBtn').removeEventListener('click', cadastrar, true)

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


confirmPassInput.addEventListener('change', function () {
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



confirmPassInput.addEventListener('keyup', function () {
    if (this.value != '') {
        filled.confirmPass = true;
    } else {
        filled.confirmPass = false;
    }


    checkFilled();

});




