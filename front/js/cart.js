let cart = JSON.parse(localStorage.getItem("cart"))
let prixTotalCalcul = []
let quantityTotalCalcul = []

async function fetchInformationsJSON(id) {
    let cartInformations = await fetch('http://localhost:3000/api/products/' + id)
    return cartInformations.json()
}

async function displayProducts() {
    for (let i = 0; i < cart.length; i++) {
        let cartInformations = await fetchInformationsJSON(cart[i].id)

        //article

        let article = document.createElement("article")
        document.getElementById('cart__items').appendChild(article)
        article.classList.add("cart__item")
        article.setAttribute("data-id", cart[i].id)
        article.setAttribute("data-color", cart[i].color)


        // item img

        let cartImg = document.createElement("div")
        article.appendChild(cartImg)
        cartImg.classList.add("cart__item__img")

        // img

        let img = document.createElement("img")
        cartImg.appendChild(img)
        img.setAttribute("src", cartInformations.imageUrl)
        img.setAttribute("alt", cartInformations.altTxt)

        // item content

        let cartItem = document.createElement("div")
        article.appendChild(cartItem)
        cartItem.classList.add("cart__item__content")

        // content description

        let cartItemDescription = document.createElement("div")
        cartItem.appendChild(cartItemDescription)
        cartItemDescription.classList.add("cart__item__content__description")

        let cartItemDescriptionTitle = document.createElement("h2")
        cartItemDescription.appendChild(cartItemDescriptionTitle)
        cartItemDescriptionTitle.innerHTML = cartInformations.name

        let cartItemDescriptionColor = document.createElement("p")
        cartItemDescription.appendChild(cartItemDescriptionColor)
        cartItemDescriptionColor.innerHTML = cart[i].color

        let cartItemDescriptionPrice = document.createElement("p")
        cartItemDescription.appendChild(cartItemDescriptionPrice)
        cartItemDescriptionPrice.innerHTML = cartInformations.price

        //content setting

        let cartItemSetting = document.createElement("div")
        cartItem.appendChild(cartItemSetting)
        cartItemSetting.classList.add("cart__item__content__setting")

        // setting quantity

        let cartItemSettingQuantity = document.createElement("div")
        cartItemSetting.appendChild(cartItemSettingQuantity)
        cartItemSettingQuantity.classList.add("cart__item__content__setting__quantity")

        let cartItemSettingQuantityItem = document.createElement("p")
        cartItemSettingQuantity.appendChild(cartItemSettingQuantityItem)
        cartItemSettingQuantityItem.innerText = "Qté : " + cart[i].quantity

        let cartItemSettingQuantityInput = document.createElement("input")
        cartItemSettingQuantity.appendChild(cartItemSettingQuantityInput)
        cartItemSettingQuantityInput.setAttribute("type", "number")
        cartItemSettingQuantityInput.classList.add("itemQuantity")
        cartItemSettingQuantityInput.setAttribute("name", "itemQuantity")
        cartItemSettingQuantityInput.setAttribute("min", 1)
        cartItemSettingQuantityInput.setAttribute("max", 100)
        cartItemSettingQuantityInput.setAttribute("value", cart[i].quantity)

        // setting delete

        let cartItemSettingDelete = document.createElement("div")
        cartItemSetting.appendChild(cartItemSettingDelete)
        cartItemSettingDelete.classList.add("cart__item__content__setting__delete")

        let cartItemSettingDeleteItem = document.createElement("p")
        cartItemSettingDelete.appendChild(cartItemSettingDeleteItem)
        cartItemSettingDeleteItem.classList.add("deleteItem")
        cartItemSettingDeleteItem.innerText = "Supprimer"


        let articleTotal = cart[i].quantity * cartInformations.price;
        prixTotalCalcul.push(articleTotal);
        let quantityTotal = parseInt(cart[i].quantity)
        quantityTotalCalcul.push(quantityTotal)
    }
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    let prixTotal = prixTotalCalcul.reduce(reducer, 0)
    let quantiteTotale = quantityTotalCalcul.reduce(reducer, 0)


    let cartTotalPrice = document.getElementById('totalPrice')
    cartTotalPrice.innerText = prixTotal

    let cartTotalquantity = document.getElementById('totalQuantity')
    cartTotalquantity.innerText = quantiteTotale

    /*let errorMsg = document.getElementById('firstNameErrorMsg')
    errorMsg.innerText = "ci est un message d'erreur"*/
}
displayProducts()
/*// prix total 

async function displayPrice() {
    for (let i = 0; i < cart.length; i++) {
        let cartInformations = await fetchInformationsJSON(cart[i].id)
        let prixTotalCalcul = []

        debugger
        let articleTotal = cart[i].quantity * cartInformations.price;

        prixTotalCalcul.push(articleTotal);


    }
}

/* if (!cart) {
    cart = []
}

let result = cart.filter(product => product.id == informations.id && product.color == informations.color);

if (result.length > 0) {
    cart = cart.map(product => {
        if (product.id == informations.id && product.color == informations.color) {
            return {
                ...product,
                quantity: parseInt(product.quantity) + parseInt(informations.quantity)
            }
        }
        return product
    })
} else {
    cart.push(informations)
}*/
