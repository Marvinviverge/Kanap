document.addEventListener("DOMContentLoaded", function () {

    // Création d'une fonction principale "main" qui va appeler les autres fonctions
    async function main() {
        let url = new URL(window.location.href);
        let id = url.searchParams.get("id");
        let product = await getId(id);

        createItem(product);
        BtnClick(product);
    }

    main();

    // Création d'une fonction permettant de récupérer les informations d'un produit selectionné
    async function getId(id) {
        return fetch('http://localhost:3000/api/products/' + id)
            .then(function (response) {
                return response.json()
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    // Création d'une fonction permettant d'intégrer/afficher les éléments HTML du produit selectionné
    function createItem(product) {

        // Récupération des éléments parents
        const title = document.getElementsByTagName("title")[0];
        const parentImg = document.getElementsByClassName("item__img");
        const parentName = document.getElementById("title");
        const parentPrice = document.getElementById("price");
        const parentDescription = document.getElementById("description");

        // Création la balise image avec ses attributs
        const productImg = document.createElement("img");
        productImg.setAttribute("src", product.imageUrl);
        productImg.setAttribute("alt", product.altTxt);
        // Push après notre balise à la fin de la liste.
        parentImg[0].appendChild(productImg);

        // Changement valeurs à la volée
        title.innerHTML = product.name;
        parentName.innerText = product.name;
        parentPrice.innerText = product.price;
        parentDescription.innerText = product.description;

        // Création des choix couleur
        const SelecteurCouleur = document.getElementById("colors")
        let options = product.colors
        options.forEach(function (element) {
            SelecteurCouleur.appendChild(new Option(element, element));
        })
    }

    // Création d'une classe
    class ProductClass {
        constructor(id, name, color, qty) {
            this.id = id;
            this.name = name;
            this.color = color;
            this.qty = qty;
        }
    }

    // Création d'une fonction permettant d'ajouter le produit souhaité au localstorage.
    function BtnClick(product) {

        let buttonAdd = document.getElementById("addToCart")

        // Création d'un évènement d'écoute au clic sur le bouton "Ajouter au panier"
        buttonAdd.addEventListener("click", (e) => {

            //On empêche la saisie de valeur négative ou supérieur à cent, ainsi que la saisie vide
            if ((!document.getElementById('colors').value && (document.getElementById('quantity').value <= 0 || document.getElementById('quantity').value > 100))) {
                alert("Merci de selectionner une couleur et une quantité valide");
                return
            } else if (!document.getElementById('colors').value) {
                alert("Merci de selectionner une couleur valide");
                return
            } else if ((document.getElementById('quantity').value <= 0 || document.getElementById('quantity').value > 100)) {
                alert("Merci de selectionner une quantité valide");
                return
            }

            let informations = new ProductClass(
                product._id,
                product.name,
                document.getElementById('colors').value,
                document.getElementById('quantity').value
            )

            // Création d'une variable pour récupérer les éléments du localstorage
            let cart = JSON.parse(localStorage.getItem("cart"))

            // Si le localstorage est vide, création d'un tableau vide
            if (!cart) {
                cart = []
            }

            // Création d'une variable pour comparer les éléments présent dans le tableau à ceux du produit choisi
            let result = cart.filter(product => product.id === informations.id && product.color === informations.color);

            // S'il y a un résultat, alors on ajoute à ce résultat, sinon on push dans le tableau
            if (result.length > 0) {

                cart = cart.map(product => {
                    if (product.id === informations.id && product.color === informations.color) {

                        return {
                            ...product,
                            qty: parseInt(informations.qty, 10) + parseInt(product.qty, 10)
                        }
                    }
                    return product
                })
            } else {
                cart.push(informations)
            }



            // On envoit les informations du tableau au localstorage et on affiche un message de confirmation
            localStorage.setItem("cart", JSON.stringify(cart))
            alert('Produit ajouté au panier')
        })
    }
})
