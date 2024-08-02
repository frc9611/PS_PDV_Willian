if (document.readystate === "loding") {
    document.addEventlistener ("DOMContentLoaded", ready)
} else {
    ready()
}

/* ANIMAçÃO */



function togglePopupCar() {
    var popup = document.getElementById("infocar");
    var carrinho = document.querySelector(".carrinho");
    
    if (popup.style.display === "none" || popup.style.display === "") {
        popup.style.display = "block";
        setTimeout(function() {
            carrinho.classList.add("move");
            popup.classList.add("show");
        }, 10); 
    } else {
        popup.classList.remove("show");
        carrinho.classList.add("move1");
        setTimeout(function() {
            popup.style.display = "none";
            carrinho.classList.remove("move");
            carrinho.classList.remove("move1");
        }, 500);
    }
}

/* FUNÇÕES */

function ready() {
    
    const addCarBtn = document.getElementsByClassName("compra")
    for (var i = 0; i < addCarBtn.length; i++) {
        addCarBtn[i] .addEventListener("click", addProdCar) }

    const valueQuant = document.getElementsByClassName("prodQuant")
    for (var i = 0; i < valueQuant.length; i++) {
        valueQuant[i].addEventListener("change", removeZero)
    }
} 

function removeZero (event) {
    if (event.target.value === "0") {
        event.target.parentElement.parentElement.parentElement.remove()
    }

    updateTotalCar()
}

function updateTotalCar() {
    
    let totalValueCar = 0
    const carProds = document.getElementsByClassName("item")
    for (var i = 0; i < carProds.length; i++) {
        const carProdPrice = carProds[i].getElementsByClassName("carProdValue")[0].innerText.replace("R$", "").replace("," , ".")
        const carProdQuant = carProds[i].getElementsByClassName("prodQuant")[0].value

        totalValueCar += carProdPrice * carProdQuant
    }
    totalValueCar = totalValueCar .toFixed(2)
    document.querySelector(".totalCar").innerText = "R$" + totalValueCar.replace("." , ",")
}

function addProdCar(event) {
    const button = event.target
    const infoProds = button.parentElement
    const prodImg = infoProds.getElementsByClassName("produtos")[0].src
    const prodName = infoProds.getElementsByClassName("prodName")[0].innerText
    const prodValue = infoProds.getElementsByClassName("prodValue")[0].innerText

    const allProdNames = document.getElementsByClassName("carProdName")
    for (var i = 0; i < allProdNames.length; i++) {
        if (allProdNames[i].innerText === prodName) {
            const igualMaisQuant = allProdNames[i].parentElement.getElementsByClassName("prodQuant")[0]
            if (igualMaisQuant.value < 10) {
                igualMaisQuant.value++
            }
            
            updateTotalCar()
            return
        }
    }
    
    let newProdCar = document.createElement("div")
    newProdCar.classList.add("item")

    newProdCar.innerHTML = 
    `
    
        <img src="${prodImg}" class="carProdimg">
                    <div class="item-info">
                        <h2 class="carProdName">${prodName}</h2>
                        <span class="carProdValue">${prodValue}</span>
                        <h3 class="quantName">Quantidade:<input type="number" value="1" min="0" max="10" class="prodQuant"></h3>

    `

    const ItemNew = document.querySelector(".infocar")
    ItemNew.appendChild(newProdCar)

    updateTotalCar()
    newProdCar.getElementsByClassName("prodQuant")[0].addEventListener("change", removeZero)
}