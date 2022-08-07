fetch('http://localhost:3000/api/products')
    .then(response => {
        if (response.ok) {
            return (response.json())
        }
    })
    .then(items => createItems(items))

function createItems(items) {
    let documentItems = document.getElementById('items')
    for (let i = 0; i < items.length; i++) {

        let link = document.createElement("a")
        documentItems.appendChild(link)
        link.setAttribute("href", './product.html?id=' + items[i]._id)

        let article = document.createElement("article")
        link.appendChild(article)

        let img = document.createElement("img")
        article.appendChild(img)
        img.setAttribute("src", items[i].imageUrl)
        img.setAttribute("alt", items[i].altTxt)

        let title = document.createElement("h3")
        article.appendChild(title)
        title.classList.add("productName")
        title.innerHTML = items[i].name

        let p = document.createElement("p")
        article.appendChild(p)
        p.classList.add("productDescription")
        p.innerHTML = items[i].description
    }
}