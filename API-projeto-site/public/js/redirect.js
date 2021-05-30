let userSession = sessionStorage.getItem('user') ? true : false;
let userInSign = sessionStorage.getItem('cadastroUser') ? true : false;

console.log(userInSign);
console.log(window.location.pathname)


if (userInSign && window.location.pathname != '/chooseLane.html') {
    window.location.replace('chooseLane.html');
} else if (!userInSign && window.location.pathname == '/chooseLane.html') {
    window.location.replace('login.html');
}

if (userSession && window.location.pathname != '/index.html') {
    window.location.replace('index.html');
} else if (!userSession && window.location.pathname == '/index.html') {
    window.location.replace('login.html');
}