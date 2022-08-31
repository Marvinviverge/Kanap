document.addEventListener("DOMContentLoaded", function () {

    // Création d'une fonction principale "main" qui va appeler les autres fonctions
    async function main() {
        let url = new URL(window.location.href);
        let orderId = url.searchParams.get("id");

        displayOrderID(orderId)
        removeLocalStorage()

    }

    main();

    // Création d'une fonction permettant l'affichage du numéro de commande 
    function displayOrderID(orderId) {
        let displayOrderId = document.querySelector("#orderId")
        displayOrderId.innerText = orderId;
    }

    // Création d'une fonction permettant de clear le localstorage une fois le numéro de commande affiché au client
    function removeLocalStorage() {
        window.localStorage.clear()
    }

})