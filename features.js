
function toggleState (object, state) {
    // var item = document.getElementById(object).style.display = "state";
    var item = document.getElementById(object);
    // newState = toString(state);
    
    item.style.display = state;
    }


    function changeElement(id) {
    var el = document.getElementById(id);
    el.style = hidden;  
  }

   /*  function clearProductsTable() { //clears the table as displayed can be re-generated from the array again 
        const productsTableBodyElement = document.querySelector("#products__table tbody");
        productsTableBodyElement.remove();

    } */