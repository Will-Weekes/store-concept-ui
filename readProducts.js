const addProductToTable = (product,index) => {
    const newProductHTML = `
        <tr data-index="${index}"> // c
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.type}</td>
            <td>${product.stock}</td>
            <td>
                <img src="${product.image}" alt="${product.name}"/>
            </td>
        <tr>
    `;


}

let products = [];

const loadProducts = () => {

    return fetch("products.json")

    .then(response => response.json)

    .then(data => Array.from(data))

    .then(productsArray => products = productsArray)

    .finally(() => products.forEach(addProductToTable))


}