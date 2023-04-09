// alert("readProducts.js started running");
// Credit: Original script written by  Martin Shaw https://github.com/martinshaw/
document.addEventListener("DOMContentLoaded", () =>{
    
    const loadingElement = document.querySelector("#products__loading");
    const productsTableElement = document.querySelector("#products__table");
    const productsTableBodyElement = document.querySelector("#products__table tbody")

    if (loadingElement == null || productsTableElement ==null) return;

    const addProductToTable = (product, index) => {
        
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
        // alert("adding product" + index + "to table" );
        productsTableBodyElement.innerHTML += newProductHTML;

    }

    const addClickEventListenersToTableRows = () => {
        productsTableBodyElement.addEventListener("click", (event) => {

            const rowElement = event.target.tagname ==='TR' ? event.target : event.target.closest("tr");
            
            if (products.length < 1) return;

            const product = products[rowElement.dataset.index || 0];

            alert(`You clicked on ${product.name} with ID of ${product.id}`);

        });
    };


    let products = [];

    const loadProducts = () => {
        // alert("loadProducts started running");
        return fetch("products.json")

        .then(response => response.json())

        .then(data => Array.from(data))

        .then(productsArray => products = productsArray)

        .then(() => products.forEach(addProductToTable))

        .finally(() => addClickEventListenersToTableRows())

        .catch(error => {
            console.error(error);
            alert("Error : Unable to load products ");    
        });

    };
    loadProducts ();
    // alert("readProducts.js finished running");
});