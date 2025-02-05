/*CARREGAR FIIS SALVOS */
async function fiisSavesF(fii, userId) {
    const response = await fetch(`http://localhost:3000/fiisSaves/${userId}`)
    const fiisSaves = await response.json()
    for (let i = 0; i < fiisSaves.length; i++) {
        if (fii.id == fiisSaves[i].fiiId) {
            const icon = document.createElement("i")
            icon.classList.add("fa-solid", "fa-circle-check")
            fii.appendChild(icon)
        }
    }
}

/*CARREGAR FIIS */
async function carregarFiis(userId) {
    try {
        const response = await fetch(`http://localhost:3000/fiisSaves/${userId}`)
        const fiisSaves = await response.json()

        for (let i = 0; i < fiisSaves.length; i++) {
            const responseFii = await fetch(`http://localhost:3000/fiis/${fiisSaves[i].fiiId}`)
            const fiiData = await responseFii.json() // Adicionado `await` corretamente
            const fii = document.createElement("div")
            fii.innerHTML = fiiData.fii
            fii.id = fiiData.id
            fii.classList.add("fii", "select")

            const menu = document.querySelector(".menu") // Garantir que menu está definido
            if (menu) {
                menu.appendChild(fii)
            } else {
                console.error("Elemento .menu não encontrado")
            }
        }

        /*Redirencionando para os Fiis selecionados */
        const fiisSelects = document.querySelectorAll(".select")
        fiisSelects.forEach(Element => {
            Element.addEventListener("click", () => {
                localStorage.setItem("fiiId", `${Element.id}`)
                window.location.href = "pages/fiis.html"
            })
        })
        /**/
    } catch (error) {
        console.error("Erro ao carregar FIIs:", error)
    }
}

/*MENU*/
async function menuF() {
    const bars = document.querySelector(".bars")
    const menu = document.querySelector(".menu")
    const faLeft = document.querySelector(".fa-left-long")
    faLeft.addEventListener("click", () => {
        menu.style.marginLeft = "-190px"
    })

    bars.addEventListener("click", () => {
        menu.style.marginLeft = "0px"
    })
}

/* USUARIO*/
async function usuarioF(userId, user) {
    /*COLOCAR NOME DO USUARIO NA PAGINA */
    const userName = document.querySelector(".user-name")
    userName.innerHTML = user.name
    /* */

    /*AREA DE PERIGO*/
    let activeDanger = false
    const span = document.querySelector(".span-danger")
    const deleteAccount = document.querySelector(".delete-account")
    span.addEventListener("click", () => {
        if (activeDanger) {
            deleteAccount.style.display = "none"
            activeDanger = false
        } else {
            deleteAccount.style.display = "flex"
            activeDanger = true
        }
    })

    let activeVeryDanger = false
    const deleteAccountContainer = document.querySelector(".delete-account-container")
    deleteAccount.addEventListener("click", () => {
        document.querySelector(".name").innerHTML = user.name
        deleteAccountContainer.style.display = "flex"
        document.querySelector(".delete-danied").addEventListener("click", () => {
            deleteAccountContainer.style.display = "none"
            window.location.reload()
        })
        document.querySelector(".delete-confirm").addEventListener("click", async () => {
            await fetch(`http://localhost:3000/deleteAccount/${userId}`, {
                method: 'DELETE'
            })
            localStorage.removeItem("userId")
            window.location.reload()
        })
    })

    /* */

    /*USUARIO MENU*/
    activeUserMenu = false
    const userMenu = document.querySelector(".user")
    const userEditBox = document.querySelector(".user-edit-box")
    userMenu.addEventListener("click", () => {
        if (activeUserMenu) {
            userEditBox.style.display = "none"
            activeUserMenu = false
        } else {
            userEditBox.style.display = "block"
            activeUserMenu = true
        }
    })
    /**/

    /*ATUALIZAR NOME DO USUARIO*/
    const saveName = document.querySelector(".save-button")
    saveName.addEventListener("click", async () => {
        const newName = document.querySelector(".new-name").value
        if (newName) {
            try {
                const response = await fetch(`http://localhost:3000/updateUser/${userId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: newName }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }
                window.location.reload()
            } catch (error) {
            }
        }
    })
    /* */

    /*LOGOUT*/
    const logoutButton = document.querySelector(".logout-button")
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("userId")
        window.location.reload()
    })
    /* */

}


/*WINDOWS LOAD*/
window.onload = async () => {
    const userId = localStorage.getItem("userId")
    const response = await fetch(`http://localhost:3000/user/${userId}`)
    const user = await response.json()

    if (!userId) {
        window.location.href = "pages/login.html" // Altere para a rota correta da sua página de login
    }

    try {
        const response = await fetch("http://localhost:3000/fiis")
        const fiis = await response.json()

        const sectionFiis = document.querySelector(".fiis")

        fiis.slice(0, 50).forEach(fiiData => {
            const fii = document.createElement("div")
            fii.innerHTML = fiiData.fii
            fii.id = fiiData.id
            fii.classList.add("fii")
            sectionFiis.appendChild(fii)
            /*Adiocionar os fiis ja salvos*/
            fiisSavesF(fii, userId)
            /**/
        })
        /*Carregar fiis salvos*/
        carregarFiis(userId)
        /**/
        /*FII BUTTONS*/

        const FIIButton = document.querySelectorAll(".fii")

        FIIButton.forEach(Element => {
            Element.addEventListener("click", async () => {
                const icon = Element.querySelector(".fa-circle-check")
                const fiiId = Element.id

                if (icon) {

                    /*EXCLUIR O FII*/
                    const response = await fetch(`http://localhost:3000/deleteFii/${userId}/${fiiId}`, {
                        method: 'DELETE',
                    })

                    const data = await response.json();

                    /**/

                    Element.removeChild(icon);

                } else {

                    /*SALVANDO o FII */
                    const response = await fetch('http://localhost:3000/save', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ userId, fiiId })//Envia os dados no corpo da requisição
                    })

                    /**/

                    const icon = document.createElement("i")
                    icon.classList.add("fa-solid", "fa-circle-check")
                    Element.appendChild(icon)
                }
            })
        })
        /*MENU*/
        menuF()
        /* */

        /*USUARIOS */
        usuarioF(userId, user)
        /* */


    } catch (error) {
        console.error("Erro ao carregar FIIs:", error)
    }


}


