let user = sessionStorage.getItem('cadastroUser');
user = JSON.parse(user);

sendToDb = () => {


    if (selected != null && selected != undefined) {
        if (selected.id == 'topSelect') {
            user.fkRole = 1;
        } else if (selected.id == 'midSelect') {
            user.fkRole = 2;
        } else if (selected.id == 'bottomSelect') {
            user.fkRole = 3;
        } else if (selected.id == 'supSelect') {
            user.fkRole = 4;
        } else if (selected.id == 'jgSelect') {
            user.fkRole = 5;
        }

        fetch(`usuarios/cadastrar/${JSON.stringify(user)}`, {
            method: 'POST',
        }).then((response) => {
            if (response.ok) {
                sessionStorage.removeItem('cadastroUser');
                window.location.replace('login.html');
            }
        })

    } else {
        document.querySelector('.error-bg').classList.add('visible')
        setTimeout(() => {
            document.querySelector('.error-bg').classList.remove('visible')

        }, 400)
    }

}



hoverEffect = (listen, toAdd) => {
    document.querySelector(listen).addEventListener('mouseover', () => {
        if (!document.querySelector(listen).classList.contains('selected')) {
            document.querySelector('.choosing').classList.add(toAdd);
        }
    })


    document.querySelector(listen).addEventListener('mouseout', () => {
        if (!document.querySelector(listen).classList.contains('selected')) {
            document.querySelector('.choosing').classList.toggle(toAdd);
        }
    })
}



hoverEffect('#topSelect', 'top');
hoverEffect('#midSelect', 'mid');
hoverEffect('#jgSelect', 'jg');
hoverEffect('#bottomSelect', 'adc');
hoverEffect('#supSelect', 'sup');


setLane = (classToSet) => {
    document.querySelector('.choosing').classList.remove(classToSet);

    if (document.querySelector('.selected-role').classList.length != 1) {
        document.querySelector('.selected-role').classList.remove(document.querySelector('.selected-role').classList[1]);
        document.querySelector('.selected-role').classList.add(classToSet);


    } else {
        document.querySelector('.selected-role').classList.add(classToSet);

    }
}



let selected;

document.querySelectorAll('.lane').forEach((item) => {
    item.addEventListener(('click'), () => {


        if (item.id == 'topSelect') {
            setLane('top')
        } else if (item.id == 'midSelect') {
            setLane('mid');
        } else if (item.id == 'bottomSelect') {
            setLane('adc');
        } else if (item.id == 'jgSelect') {
            setLane('jg');
        } else if (item.id == 'supSelect') {
            setLane('sup');
        }
        selected = item;
        item.classList.add('selected');

        document.querySelectorAll('.lane').forEach((lane) => {
            if (lane.id != selected.id) {
                lane.classList.remove('selected');
            }
        })
    })
})