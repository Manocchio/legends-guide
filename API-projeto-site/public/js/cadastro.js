
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


let userInput = document.querySelector('#userInput');
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



                let user = {
                    puuid: userInfo.puuid,
                    riotId: userInfo.id,
                    accId: userInfo.accountId,
                    nameUser: userInfo.name,
                    iconId: userInfo.profileIconId,
                    summonerLevel: userInfo.summonerLevel,
                    pass: passwordInput.value,
                }



                fetch(`usuarios/cadastrar/${JSON.stringify(user)}`, {
                    method: 'POST',
                }).then((response) => {
                    if (response.ok) {

                        alert('cadastrou');
                    }
                })

            });
        } else {
            document.querySelector('#summonerNick').classList.add('invalid');
            document.querySelector('#userInput').value = '';
            document.querySelector('#userInput').placeholder = 'Digite um invocador existente';
            setTimeout(() => {
                document.querySelector('#summonerNick').classList.toggle('invalid');
            }, 5000);
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




