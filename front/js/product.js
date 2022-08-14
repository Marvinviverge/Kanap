let url = new URL(window.location.href);
let id = url.searchParams.get("id");

fetch('http://localhost:3000/api/products/' + id)
    .then(response => {
        if (response.ok) {
            return (response.json())
        }
    })
    .then(item => createItem(item))

function createItem(item) {
    let documentItemImg = document.getElementsByClassName('item__img')
    let img = document.createElement("img")
    documentItemImg[0].appendChild(img)
    img.setAttribute("src", item.imageUrl)
    img.setAttribute("alt", item.altTxt)

    let documentItemTitle = document.getElementById('title')
    documentItemTitle.innerText = item.name

    let documentItemPrice = document.getElementById('price')
    documentItemPrice.innerText = item.price

    let documentItemDescription = document.getElementById('description')
    documentItemDescription.innerText = item.description
    let documentItemColors = document.getElementById('colors')
    for (let i = 0; i < item.colors.length; i++) {
        let option = document.createElement("option")
        documentItemColors.appendChild(option)
        option.setAttribute("value", item.colors[i])
        option.innerText = item.colors[i]
    }
}

let buttonAdd = document.getElementById("addToCart")

buttonAdd.addEventListener("click", (e) => {
    if (!document.getElementById('colors').value || !document.getElementById('quantity').value) {
        return
    }

    let informations = {
        id: id,
        color: document.getElementById('colors').value,
        quantity: document.getElementById('quantity').value
    };

    let cart = JSON.parse(localStorage.getItem("cart"))
    if (!cart) {
        cart = []
    }

    let result = cart.filter(product => product.id == informations.id && product.color == informations.color);

    if (result.length > 0) {
        cart = cart.map(product => {
            if (product.id == informations.id && product.color == informations.color) {
                return {
                    ...product,
                    quantity: parseInt(product.quantity, 10) + parseInt(informations.quantity, 10)
                }
            }
            return product
        })
    } else {
        cart.push(informations)
    }

    localStorage.setItem("cart", JSON.stringify(cart))
});