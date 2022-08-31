document.addEventListener("DOMContentLoaded", function () {

    // Création d'une fonction principale "main" qui va appeler les autres fonctions
    async function main() {
        let products = await getApi();

        for (let article of products) {
            createItems(article);
        }
    }

    main();

    // Création d'une fonction pour récupérer les données de l'API
    async function getApi() {
        return fetch('http://localhost:3000/api/products')
            .then(function (response) {
                return response.json();
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // Création d'une fonction pour intégrer/afficher au HTML les données provenant de l'API
    function createItems(article) {

        let documentItems = document.getElementById('items')

        documentItems.insertAdjacentHTML(
            "beforeend",
            `<a href="./product.html?id=${article._id}">
                <article>
                    <img src="${article.imageUrl}" alt="${article.altTxt}">
                    <h3 class="productName">${article.name}</h3>
                    <p class="productDescription">${article.description}</p>
                </article>
            </a>`
        );
    }

})