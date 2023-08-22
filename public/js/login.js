

const myModal = new bootstrap.Modal(document.getElementById("register-modal")); 

let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (logged) {
        saveSession(logged, true); 
        window.location.href = "home.html";
    }
}

document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const sessionCheckbox = document.getElementById("session-check");

    const account = getAccount(email);

    if (!account) {
        alert("Opps! Verifique o usuário ou a senha.");
        return;
    }

    if (account.password !== password) {
        alert("Opps! Verifique o usuário ou a senha.");
        return;
    }

    saveSession(email, sessionCheckbox.checked); 
    window.location.href = "home.html";
});

document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if (email.length < 5) {
        alert("Preencha o campo com um e-mail válido.");
        return;
    }

    if (password.length < 4) {
        alert("Preencha a senha com no mínimo 4 dígitos.");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide(); 

    alert("Conta criada com sucesso.");
});

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if (saveSession) {
        localStorage.setItem("session", data.toString()); 
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if (account) {
        return JSON.parse(account);
    }

    return null; 
}

