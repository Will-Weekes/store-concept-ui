
function toggleState (object, state) {
    // var item = document.getElementById(object).style.display = "state";
    var item = document.getElementById(object);
    // newState = toString(state);
    
    item.style.display = state;
    }


    function changeElement(id) {
    var el = document.getElementById(id);
    el.style.color = "red";
    el.style.fontSize = "15px";
    el.style.backgroundColor = "#FFFFFF";
  }