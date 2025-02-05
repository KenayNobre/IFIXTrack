
document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault()

    const email = document.querySelector(".input-email").value
    const name = document.querySelector(".input-nome").value

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name })//Envia os dados no corpo da requisição
    })
    const data = await response.json()//Transforma em JSAON

    if (response.ok) {
        localStorage.setItem("userId", `${data.id}`)
        window.location.href = "../index.html"
    } else {
        alert("Usuário não encontrado")
    }
})

document.querySelector(".login-button").addEventListener("click", () => {
    window.location.href = "login.html"
})

document.querySelector(".register-button").addEventListener("click", () => {
    window.location.href = "register.html"
})