const myModal = new bootstrap.Modal(document.getElementById("transaction-modal")); 

let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transactions: []
}

document.getElementById("button-logout").addEventListener("click", logout);


document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide()

    getCashIn();
    getCashOut();
    getTotal();
    getTransactions() 
    

    alert("Lançamento adicionado com sucesso.");
});



checkLogged();

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser) {
        data = JSON.parse(dataUser);
    }

    getTransactions();
}



    const dataUser = localStorage.getItem (logged);
    if(dataUser) {
        data = JSON.parse(dataUser);
    }

    function logout() {
        sessionStorage.removeItem("logged");
        localStorage.removeItem("session");
    
        window.location.href = "index.html"
    }

    function getTransactions () {
        const transactions = data.transactions;
        let transactionsHtml = ``;
        console.log(transactions)

        if(transactions.length) {
            transactions.forEach ((item) => {
                let type = "Entrada" 
                console.log(item)

                if(item.type === "2") {
                    type = "Saída"
                }
                
                transactionsHtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                 </tr>
                `
             } )
        }

        document.getElementById("transactions-list").innerHTML = transactionsHtml;

    }

    function saveData(data) {
        localStorage.setItem(logged, JSON.stringify(data));
    }
