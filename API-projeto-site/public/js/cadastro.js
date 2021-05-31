
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


cadastrar = () => {
    sessionStorage.clear();
    let summoner = userInput.value;


    if (passwordInput.value != confirmPassInput.value) {
        invalidate('#passField', '#password', 'As senhas não estão iguais');
        invalidate('#confirmPassField', '#confirmPassword', 'As senhas não estão iguais');
    } else if (passwordInput.value.length < 3) {
        invalidate('#passField', '#password', 'Senha muito pequena');
    } else {

        fetch(`summoner/getSummoner/${summoner}`, {
            method: 'GET',
        }).then((response) => {
            if (response.ok) {
                response.json().then(async (data) => {
                    let userInfo = await data.summoner;

                    fetch(`usuarios/verify/${summoner}`).then((response) => {
                        if (response.ok) {
                            response.json().then((data) => {
                                if (data.exists) {
                                    invalidate('#summonerNick', '#userInput', 'Invocador já possui cadastro');

                                } else {

                                    let user = {
                                        puuid: userInfo.puuid,
                                        riotId: userInfo.id,
                                        accId: userInfo.accountId,
                                        nameUser: userInfo.name,
                                        iconId: userInfo.profileIconId,
                                        summonerLevel: userInfo.summonerLevel,
                                        pass: passwordInput.value,
                                        fkRole: null,
                                    }




                                    sessionStorage.setItem('cadastroUser', JSON.stringify(user));


                                    window.location.replace('chooseLane.html')

                                }
                            })
                        }
                    }).catch((error) => {
                        console.log(error);
                    })


                });
            } else {

                invalidate('#summonerNick', '#userInput', 'Digite um invocador existente');

            }
        });
    }
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




