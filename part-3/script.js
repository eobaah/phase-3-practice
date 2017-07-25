let counter = 0

let addBtn = document.querySelectorAll('.add-cart-btn')
let cartBtn = document.getElementById('cart-button')
let closeBtn = document.querySelector('.close-modal')
let cartArray = []
let cartItemsArr = []

function increase() {
  document.getElementById('cart-item-count').innerHTML = cartArray.length+1
}

function modal() {
  element = document.getElementById('modal');
  element.style.visibility = (element.style.visibility == 'visible') ? 'hidden' : 'visible';
  element = document.getElementById('overlay');
  element.style.visibility = (element.style.visibility == 'visible') ? 'hidden' : 'visible';
}

function cartItems() {
  cartItemsArr = Object.keys(cartArray)
  for( let index = 0; index <= cartArray.length; index++ ){
    alert( cartArray )
  }
}

addBtn.forEach( (target) => {
  target.addEventListener('click', () => {
      increase()
  let item = JSON.parse(target.getAttribute('data-item'))
  cartArray.push( item )
  console.log( cartArray )
  });
});

cartBtn.addEventListener('click', () => {
  cartItems()
  modal()
});

closeBtn.addEventListener('click', (target) => {
   modal()
});




//
// var node = document.createElement("DIV");                 // Create a <li> node
// var textnode = document.createTextNode("Water");         // Create a text node
// node.appendChild(textnode);                              // Append the text to <li>
// document.getElementById("myList").appendChild(node);     // Append <li> to <ul> with id="myList"
