let addBtn = document.querySelectorAll('.add-cart-btn')
let cartBtn = document.getElementById('cart-button')
let closeBtn = document.querySelector('.close-modal')
let clearBtn = document.querySelector('.clear-cart')
let cartCounter = document.getElementById('cart-item-count')
let cart = document.getElementById( 'add-items-modal' )
let cartTotal = document.getElementById( 'cart-item-count' )
let modalTotal = document.querySelector('.modal-total')
let cartArray = []
let cartItemsArr = []
let cartPriceArr = []

function increase() {
  cartCounter.innerHTML = cartArray.length+1
}

function modal() {
  element = document.getElementById('modal');
  element.style.visibility = (element.style.visibility == 'visible') ? 'hidden' : 'visible';
  element = document.getElementById('overlay');
  element.style.visibility = (element.style.visibility == 'visible') ? 'hidden' : 'visible';
}

function sumCartItems() {
  cartTotal = cartPriceArr.reduce( (sum, item) => {
    return sum + Number(item)
  }, 0)
  modalTotal.innerHTML = `$ ${cartTotal.toFixed(2)}`
}

function clearCart() {
  emptyCartElements()
  cartCounter.innerHTML = "(0)"
  modalTotal.innerHTML = "$0.00"
}


function populateCart() {
  cartArray.forEach( element => {
    for ( var k in element ) {
      cartItemsArr.push( k )
      cartPriceArr.push( element[k] )
    }
  })
  for( let index = 0; index < cartArray.length; index++) {
    let itemPriceNode = document.createElement( 'DIV' );
    let itemNameNode = document.createElement( 'SPAN' );
    let priceNameNode = document.createElement( 'SPAN' );
    let textNode = document.createTextNode( cartItemsArr[ index ] );
    let priceNode = document.createTextNode( cartPriceArr[ index ] );
    itemNameNode.appendChild( textNode );
    priceNameNode.appendChild( priceNode );
    itemPriceNode.appendChild( itemNameNode );
    itemPriceNode.appendChild( priceNameNode );
    cart.appendChild( itemPriceNode )
  }
}

function emptyCartElements() {
  cartArray = []
  while (cart.hasChildNodes()) {
      cart.removeChild(cart.firstChild);
  }
  modalTotal.innerHTML = "$0.00"
}

addBtn.forEach( (target) => {
  target.addEventListener('click', () => {
      increase()
  let item = JSON.parse(target.getAttribute('data-item'))
  cartArray.push( item )
  console.log( cartArray )
  return cartArray
  });
});


cartBtn.addEventListener('click', () => {
  populateCart()
  sumCartItems()
  modal()
});

closeBtn.addEventListener('click', (target) => {
   modal()
});

clearBtn.addEventListener('click', () => {
   clearCart()
   modal()
});
