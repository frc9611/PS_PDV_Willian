if (document.readystate === "loding") {
    document.addEventlistener ("DOMContentLoaded", ready)
} else {
    ready()
}

function togglePopupCard() {
    var popupCard = document.getElementById("newCardArea");
    var card = document.querySelector(".newCard");
    
    if (popupCard.style.display === "none" || popupCard.style.display === "") {
        popupCard.style.display = "block";
        setTimeout(function() {
            card.classList.add("move");
            popupCard.classList.add("show");
        }, 10); 
    } else {
        popupCard.classList.remove("show");
        card.classList.add("move1");
        setTimeout(function() {
            popupCard.style.display = "none";
            card.classList.remove("move");
            card.classList.remove("move1");
        }, 500);
    }
}

const inputFile = document.querySelector("#newCardImg-Input");
const ImgChose = document.querySelector(".NewCardImg-Chose");
const ImgText = 'Escolha uma imagem';
ImgChose.innerHTML = ImgText;

inputFile.addEventListener('change', function(e) {
    const inputTarget = e.target;
    const chosenImage = inputTarget.files[0];

    if (chosenImage) {
        const ImgReader = new FileReader();

        ImgReader.addEventListener("load", function (e) {
            const ImgReaderTarget = e.target;

            const ShowChosenImg = document.createElement("img");
            ShowChosenImg.src = ImgReaderTarget.result;
            ShowChosenImg.classList.add("newCardImg-selected")

            ImgChose.innerHTML = "";
            ImgChose.appendChild(ShowChosenImg);
        });

        ImgReader.readAsDataURL(chosenImage);
    } else {
        ImgChose.innerHTML = ImgText;
    }
})

function newCard() {
    const imgInput = document.getElementById("newCardImg-Input")
    const nameInput = document.getElementById("newCardName")
    const descInput = document.getElementById("newCardDesc")
    const priceInput = document.getElementById("newCardPric")

    const cardImg = imgInput.files[0]
    const cardName = nameInput.value;
    const cardDesc = descInput.value;
    const cardPrice = priceInput.value;

    if (!cardName || !cardPrice || isNaN(cardPrice)|| cardPrice <=0) {
        alert("Preencha todos os campos corretamente.");
        return;  
    }

    const newCard = document.createElement("div");
    newCard.classList.add("card")

    const reader = new FileReader();
    reader.onload = function(e) {
        newCard.innerHTML = `
        <img src="${e.target.result}" class="produtos">
            <h2 class= "prodName">${cardName}</h2>
            <h3>${cardDesc}</h3>
            <span class="prodValue">R$<valor>${parseFloat(cardPrice).toFixed(2).replace(".", ",")}</valor></span>
            <div class="compra">Adicionar</div>
        `;

        document.getElementById("card").appendChild(newCard);
        imgInput.value = "";
        nameInput.value = "";
        descInput.value = "";
        priceInput.value = "";
        
        newCard.querySelector(".compra").addEventListener("click", addProdCar);
        ImgChose.innerHTML = ImgText;
        
        togglePopupCard();
    };

    if (cardImg) {
        reader.readAsDataURL(cardImg);
    } else {
        alert("Escolha uma imagem")
    }
}

document.querySelector(".createNewProd").addEventListener("click", newCard);