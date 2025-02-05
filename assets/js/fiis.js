

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
            if(fii.id == localStorage.getItem("fiiId")){
                fii.style.backgroundColor = "var(--cor-secundaria)"
                fii.style.color = "var(--cor-principal)"
            }

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
                window.location.reload()
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

                alert("Usuário atualizado");
                window.location.reload()
            } catch (error) {
                alert("Erro ao atualizar usuário");
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

/*Por o nome do Fii na pagina */
async function fiiName(fiiData) {
    const mainTitle = document.querySelector(".main-title")
    mainTitle.innerHTML = fiiData.fii
}
/* */

/*WINDOWS LOAD*/
window.onload = async () => {
    const userId = localStorage.getItem("userId")
    const response = await fetch(`http://localhost:3000/user/${userId}`)
    const user = await response.json()

    if (!userId) {
        window.location.href = "login.html" // Altere para a rota correta da sua página de login
    }

    try {
        const response = await fetch(`http://localhost:3000/fiis/${localStorage.getItem("fiiId")}`)
        const fiiData = await response.json()

        const URL = `https://brapi.dev/api/quote/${fiiData.fii}?modules=summaryProfile&token=e16m1nnvPargWBV9goiVNH`
        const resp = await fetch(URL)

        if (resp.status === 200) {
            const obj = await resp.json()
            //(obj.results[0])
            document.querySelector(".min52").innerHTML = obj.results[0].fiftyTwoWeekLow
            document.querySelector(".max52").innerHTML = obj.results[0].fiftyTwoWeekHigh
            document.querySelector(".price").innerHTML = obj.results[0].regularMarketPrice
            document.querySelector(".faixaPreco").innerHTML = obj.results[0].regularMarketDayRange
            document.querySelector(".fii-name").innerHTML = obj.results[0].longName

            
            document.querySelector(".vMax52").innerHTML = (obj.results[0].regularMarketPrice - obj.results[0].fiftyTwoWeekHigh).toFixed(2)
            document.querySelector(".vPercentual").innerHTML = (((obj.results[0].regularMarketPrice - obj.results[0].fiftyTwoWeekHigh) / obj.results[0].fiftyTwoWeekHigh) * 100).toFixed(2)
            
        }

       
        /*Por o nome do Fii na pagina */
        fiiName(fiiData)
        /* */
        /*Carregar fiis salvos*/
        carregarFiis(userId)
        /**/
        /*FII BUTTONS*/

        /*MENU*/
        menuF()
        /* */

        /*USUARIOS */
        usuarioF(userId, user)
        /* */


    } catch (error) {
        console.error("Erro ao carregar FIIs", error)
    }

}


