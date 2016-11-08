var ElementController = (function () {

  var addButton, elementToAdd, list, event1, event2, opts, total, totalItems, totalEvent;

  totalItem = 0;

  opts = {
    "detail" : {
      "messageOnAdd" : "This is the description",
      "messageOnRemove": "Element Removed"
    }
  }

  event1 = new CustomEvent("onAdd", opts);
  event2 = new CustomEvent("onRemove", opts);
  total = document.getElementById('total-item');

  totalEvent = new CustomEvent("totalChanged", {
    "totalItem" : totalItem
  })

  changeTotal = function (amount) {
    totalItem += amount;

    totalEvent.totalItem = totalItem;
    document.dispatchEvent(totalEvent);
  };



  addButton = document.getElementById('add-button');
  elementToAdd = document.getElementById('element-description');
  list = document.getElementById('element-wrapper');

  addListElement = function () {
    var li = document.createElement('li');
    li.classList.add('element');
    li.innerHTML = elementToAdd.value;
    list.appendChild(li);
    elementToAdd.value = "";

    console.log(event1.detail.messageOnAdd);
    document.dispatchEvent(event1);
  };

  removeListElement = function (event) {
    if (true) {
      var targetElement = event.target;
      list.removeChild(targetElement);

      console.log(event2.detail.messageOnRemove);
      document.dispatchEvent(event2);
    }
  };

  getTotalItems = function () {
    return totalItem;
  }

  addButton.addEventListener('click', addListElement);
  list.addEventListener('click', removeListElement);

  return {
    add: addListElement,
    remove: removeListElement,
    getTotal: getTotalItems
  };

})();

function updateTotalElement (value) {
  console.log(value);
}

var a = ElementController.getTotal();
updateTotalElement(a);


document.addEventListener("totalEvent", function(event){
  var newTotal = event.totalItem;
  updateTotalElement(newTotal);

});
