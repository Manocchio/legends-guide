alreadyLoaded = sessionStorage.getItem("loaded") ? sessionStorage.getItem("loaded") : false;


// var audio = document.createElement("AUDIO")
// document.body.appendChild(audio);
// audio.src = "./jujutsu-kaisen.mp3"

// document.body.addEventListener("mousemove", function () {
//     audio.play()
// })



//loading screen

timeout = (ms) => {
    return new Promise(res => setTimeout(res, ms));
}


if (!alreadyLoaded) {


    loadContent = async () => {
        await timeout(13000);

        document.getElementById('loading-screen').classList.add('loaded');
    }




    loadContent().then(() => {
        document.body.classList.remove('toLoad');
        sessionStorage.setItem("loaded", true);
        console.log(alreadyLoaded)
        setTimeout(() => {
            document.getElementById('loading-container').style = "display: none;"
        }, 2050);
    });

} else {
    console.log(alreadyLoaded);
    let loadContainer = document.getElementById("loading-container");
    loadContainer.remove();
    document.body.classList.remove('toLoad');
}

let lastScrollTop = 0;

window.addEventListener("scroll", () => {
    let atualPosition = window.pageYOffset;
    if (atualPosition > lastScrollTop) {
        this.document.querySelector('.principal-bg').classList.add('scrolled')
    } else {
        if (atualPosition == 0) {
            this.document.querySelector('.principal-bg').classList.remove('scrolled');
        }
    }
    lastScrollTop = atualPosition <= 0 ? 0 : atualPosition;
});


let home = document.getElementById('homeRoute');
let guide = document.getElementById('guideRoute');

let homePage = document.getElementById('homePage');
let guidePage = document.getElementById('guidePage');

goTo = (page) => {
    if (page == 'home') {
        if (homePage.classList.contains('inactive')) {
            guidePage.classList.add('inactive');
            homePage.classList.remove('inactive');
        }
    } else if (page == 'guide') {
        if (guidePage.classList.contains('inactive')) {
            homePage.classList.add('inactive');
            guidePage.classList.remove('inactive');
        }

    }
}


logout = () => {
    sessionStorage.removeItem('user');
    window.location.replace('login.html');
}


home.addEventListener('click', () => {
    goTo('home');
});
guide.addEventListener('click', () => {
    goTo('guide');
});

document.getElementById('logout').addEventListener('click', () => {
    logout();
})
