document.addEventListener("DOMContentLoaded", function () {

    // Création d'une fonction principale "main" qui va appeler les autres fonctions
    async function main() {

        let cart = JSON.parse(localStorage.getItem("cart"))

        for (let i = 0; i < cart.length; i++) {
            let cartInformations = await fetchInformationsJSON(cart[i].id)

            displayProducts(cartInformations, cart[i]);
            DisplayTotal(cartInformations, cart);

            listenQty(cartInformations)
            listenDlt(cartInformations)

        }
        Validation(cart);
    }

    main();

    // Création d'une fonction permettant des récupérer les informations contenues dans le localstorage
    async function fetchInformationsJSON(id) {
        let cartInformations = await fetch('http://localhost:3000/api/products/' + id)
        return cartInformations.json()
    }


    // Création d'une fonction permettant l'affichage des informations reçues du localstorage
    async function displayProducts(cartInformations, cart) {

        // Récupération de la balise Html
        const domCreation = document.getElementById("cart__items");

        // Affichage des éléments reçu depuis localstorage à la suite de la balise HTML
        domCreation.insertAdjacentHTML(
            "beforeend",
            `<article class="cart__item" data-id="${cart.id}" data-color="${cart.color}">
                    <div class="cart__item__img">
                        <img src="${cartInformations.imageUrl}" alt="${cartInformations.altTxt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${cartInformations.name}</h2>
                            <p>${cart.color}</p>
                            <p>${cartInformations.price} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart.qty}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>
                `
        );
    }

    // Création d'une fonction permettant d'afficher le prix total du panier ainsi que la quantité totale de produits dans le panier
    function DisplayTotal(cartInformations, cart) {

        let TotalPrice = 0;
        let TotalQty = 0;

        for (let product of cart) {
            TotalPrice += parseInt(product.qty * cartInformations.price);
            TotalQty += parseInt(product.qty);
        }

        let cartTotalPrice = document.getElementById('totalPrice');
        let cartTotalquantity = document.getElementById('totalQuantity');

        cartTotalPrice.innerText = TotalPrice;
        cartTotalquantity.innerText = TotalQty;

    }

    // Création d'une fonction permettant la modification dynamique de la quantité de produit dans le panier, entraînant modification du prix et de la quantité totale
    function listenQty(cartInformations) {

        let allQty = document.querySelectorAll(".itemQuantity")

        allQty.forEach(function (input) {
            input.addEventListener("change", function (inputevent) {

                let elt = input.closest("article.cart__item")
                let eltId = elt.getAttribute('data-id')
                let eltColor = elt.getAttribute('data-color')

                let newCart = JSON.parse(localStorage.getItem("cart"))

                newCart = newCart.map(product => {
                    if (product.id === eltId && product.color === eltColor) {

                        return {
                            ...product,
                            qty: parseInt(inputevent.target.value, 10)
                        }
                    }
                    return product
                })
                localStorage.setItem("cart", JSON.stringify(newCart))

                DisplayTotal(cartInformations, newCart);
            })
        })

    }

    // Création d'une fonction permettant la suppression dynamique des produits dans le panier, entraînant modification du prix et de la quantité totale
    function listenDlt(cartInformations) {

        let Dlt = document.querySelectorAll(".deleteItem")

        Dlt.forEach(function (input) {
            input.addEventListener("click", function () {
                let elt = input.closest("article.cart__item")
                let eltId = elt.getAttribute('data-id')
                let eltColor = elt.getAttribute('data-color')

                let newCart = JSON.parse(localStorage.getItem("cart"))

                const result = newCart.find(product => product.id === eltId && product.color === eltColor)
                newCart = newCart.filter(product => product !== result);

                localStorage.setItem("cart", JSON.stringify(newCart))

                input.closest("article.cart__item").remove();

                DisplayTotal(cartInformations, newCart);
            })
        })

    }

    // Création d'une fonction de test de validation du formulaire
    function ValidationForm(form) {

        // Initialisation de nos variables de test.
        const stringRegex = /^[a-zA-Z-]+$/;
        const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+).(.\w{2,3})+$/;
        const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
        let control = true;

        // Si une des valeurs dans nos inputs de notre Form on affiche un méssage d'érreur.
        if (!form.firstName.value.match(stringRegex)) {
            document.getElementById("firstNameErrorMsg").innerText = "Mauvais prénom";
            control = false;
            // Sinon on affiche rien
        } else {
            document.getElementById("firstNameErrorMsg").innerText = "";
        }

        if (!form.lastName.value.match(stringRegex)) {
            document.getElementById("lastNameErrorMsg").innerText = "Mauvais nom";
            control = false;
            // Sinon on affiche rien
        } else {
            document.getElementById("lastNameErrorMsg").innerText = "";
        }

        if (!form.address.value.match(addressRegex)) {
            document.getElementById("addressErrorMsg").innerText = "Mauvaise adresse";
            control = false;
            // Sinon on affiche rien
        } else {
            document.getElementById("addressErrorMsg").innerText = "";
        }

        if (!form.city.value.match(stringRegex)) {
            document.getElementById("cityErrorMsg").innerText = "Mauvaise ville";
            control = false;
            // Sinon on affiche rien
        } else {
            document.getElementById("cityErrorMsg").innerText = "";
        }

        if (!form.email.value.match(emailRegex)) {
            document.getElementById("emailErrorMsg").innerText = "Mauvais email";
            control = false;
            // Sinon on affiche rien
        } else {
            document.getElementById("emailErrorMsg").innerText = "";
        }

        if (control) {
            return true;
        } else {
            return false;
        }
    }


    //Création d'une fonction permettant de valider la commande et d'être redirigé vers la page de confirmation
    function Validation(cart) {

        let orderButton = document.getElementById("order");

        orderButton.addEventListener("click", function (event) {
            let form = document.querySelector(".cart__order__form");
            event.preventDefault();

            if (localStorage.length !== 0) {
                if (ValidationForm(form)) {

                    let formInfos = {
                        firstName: form.firstName.value,
                        lastName: form.lastName.value,
                        address: form.address.value,
                        city: form.city.value,
                        email: form.email.value,
                    }

                    let newCart = JSON.parse(localStorage.getItem("cart"))
                    let productsId = [];
                    for (let i = 0; i < newCart.length; i++) {
                        productsId.push(newCart[i].id);
                    }

                    const orderInfos = {
                        contact: formInfos,
                        products: productsId,
                    };

                    const options = {
                        method: "POST",
                        body: JSON.stringify(orderInfos),
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    };

                    fetch("http://localhost:3000/api/products/order/", options)
                        .then((response) => response.json())
                        .then(function (data) {
                            let orderId = data.orderId
                            window.location.href = './confirmation.html?id=' + orderId;
                        })
                        .catch(function (error) {
                            console.log(error);
                        })

                } else {
                    event.preventDefault();
                    alert("Le formulaire est mal remplis.")
                }
            } else {
                event.preventDefault();
                alert("Votre panier est vide.");
            }
        })
    }

})