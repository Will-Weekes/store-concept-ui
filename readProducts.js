// alert("readProducts.js started running");
// Credit: Original script written by  Martin Shaw https://github.com/martinshaw/
let products = [];
let basketAreaElement;
let productsOverlayElement;
let basketTableElement;
let basketTableBodyElement;
const basketArray = [];//array to contain all items in basket
function BasketItem (id,quantity){//constructor to create an object that holds a product id and given quantity. Each object will be stored in above array
    this.id = id;
    this.quantity = quantity;
}
document.addEventListener("DOMContentLoaded", () =>{
    
    const loadingElement = document.querySelector("#products__loading");
    const productsTableElement = document.querySelector("#products__table");
    const productsTableBodyElement = document.querySelector("#products__table tbody")
    productsOverlayElement = document.querySelector("#products__overlay");
    basketAreaElement = document.querySelector("#basketArea");
    basketTableElement = document.querySelector("#basket__Table");
    basketTableBodyElement = document.querySelector("#basket__Table tbody");

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
            const productNum = rowElement.dataset.index;
            // alert(`You clicked on ${product.name} with ID of ${product.id}`);
            // console.log("productNum is:" + productNum);
            loadOverlay(productNum);
            
        });
    };


  

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

function clearProductsTable() { //clears the table as displayed can be re-generated from the array again 
    const productsTableBodyElement = document.querySelector("#products__table tbody");
    productsTableBodyElement.remove();

}
function clearProductsOverlayContent(){ //removes the contents of the overlay
    productsOverlayElement.innerHTML = '';
}

function addProductToOverlay (_index) { // 
    let product = products[_index];
    const newOverlayHTML = `
    <div id="overlayContent">
        <div id="overlayControls"> 
            <button id="close" onclick="closeProductsOverlay()">Close</button>
        </div>
        <p id="overlayTitle">${product.name}</p>
        <img id="overlayImage" img src="${product.table_image}" alt="product image"</img>
        <p id="overlayPrice">${product.price}</p>
        <p id="overlayType">${product.type}</p>
        <button id="overlayAddToBasket" onclick="addProductToBasket(${product.id})">Add To Basket</button>
        <p id="overlayDescription">${product.desc}</p>
    </div>
    `;
    productsOverlayElement.innerHTML += newOverlayHTML;
}
function showOverlay (){
    productsOverlayElement.style.display = 'block';
}

function hideOverlay (){
    productsOverlayElement.style.display = 'none';
}

function loadOverlay (i){
    clearProductsOverlayContent ();
    addProductToOverlay(i);
    showOverlay();

}

function closeProductsOverlay (){
    hideOverlay ();
    clearProductsOverlayContent ();
}
function addProductToBasket (_basketItem){//adds the product to the basket
    const item = new BasketItem(_basketItem,1);//create a new BasketItem w/ the product id that the function is passed and a quantity of 1
    basketArray.push(item);//adds the new BasketItem to the basketArray
    console.log(basketArray);// for debugging - read out the whole basketArray to the console when an item is added
}
function readBasket ()
{
    console.log(basketArray);
}