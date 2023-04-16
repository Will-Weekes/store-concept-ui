// alert("readProducts.js started running");
// Credit: Original script written by  Martin Shaw https://github.com/martinshaw/
var products = [];
var productsOverlayElement;
document.addEventListener("DOMContentLoaded", () =>{
    
    const loadingElement = document.querySelector("#products__loading");
    const productsTableElement = document.querySelector("#products__table");
    const productsTableBodyElement = document.querySelector("#products__table tbody")
    productsOverlayElement = document.querySelector("#products__overlay");

    if (loadingElement == null || productsTableElement ==null) return;
    if (productsOverlayElement == null) return;

    const addProductToTable = (product, index) => {
        
        const newProductHTML = `
            <tr data-index="${index}"> 
                <td>
                    <img id="productImgSmall" img src="${product.table_image}" alt="${product.name}"/>
                </td>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.type}</td>
                <td>${product.stock}</td>
                
            <tr>
        `;
        // alert("adding product" + index + "to table" );
        productsTableBodyElement.innerHTML += newProductHTML;

    }
    
    

// This will be a function to generate a filtered list from the array object - 
    // const addProductToTableFiltered = (product, index, filter, value) =>{
    //     if (filter != null && value && null) {

    //     }


    // }

    const addClickEventListenersToTableRows = () => {
        productsTableBodyElement.addEventListener("click", (event) => {

            const rowElement = event.target.tagname ==='TR' ? event.target : event.target.closest("tr");
            
            if (products.length < 1) return;

            const product = products[rowElement.dataset.index || 0];

            alert(`You clicked on ${product.name} with ID of ${product.id}`);
            // loadOverlay(${product.id});
        });
    };


    // var products = [];

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
    
    
    // function clearProductsTable() {
    //     const productsTableBodyElement = document.querySelector("#products__table tbody");
    //     productsTableBodyElement.remove();

    // }
    

    loadProducts ();
    // alert("readProducts.js finished running");
});

function clearProductsTable() { //clears the table as displayed can be re-generated from the array again 
    const productsTableBodyElement = document.querySelector("#products__table tbody");
    productsTableBodyElement.remove();

}
function clearProductsOverlayContent(){ //removes the contents of the overlay
    productsOverlayElement.innerHTML.remove();
}
// function addProductToOverlay () {
//     const newOverlayHTML = `
//     <div id="controls"> 
//     <button id="close onclick="closeProductsOverlay()">Close</button>
//     </div>
//     <p id="title">products.product.name</p>
//     <p id="price">${products.price}</p>
//     <p id="type">${products.type}</p>
//     `;

// }
function addProductToOverlay (_index) { // trying a different way
    product = products[_index];
    const newOverlayHTML = `
    <div id="controls"> 
    <button id="close onclick="closeProductsOverlay()">Close</button>
    </div>
    <p id="title">products.product.name</p>
    <p id="price">${product.price}</p>
    <p id="type">${product.type}</p>
    `;
    productsOverlayElement.innerHTML += newOverlayHTML;
}
function loadOverlay (i){
    addProductToOverlay(i);

}