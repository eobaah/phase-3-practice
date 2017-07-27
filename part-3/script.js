let addtoCartBtn = document.querySelectorAll( '.add-cart-btn' )
let openCartBtn = document.getElementById( 'cart-button' )
let closeBtn = document.querySelector( '.close-modal' )
let clearBtn = document.querySelector( '.clear-cart' )
let cartCounter = document.getElementById( 'cart-item-count' )
let cart = document.getElementById( 'add-items-modal' )
let modalTotal = document.querySelector( '.modal-total' )
let cartArray = []
let tempCartArray = []
let cartItemsArr = []
let cartPriceArr = []

function modal() {
  element = document.getElementById('modal');
  element.style.visibility = (element.style.visibility == 'visible') ? 'hidden' : 'visible';
  element = document.getElementById('overlay');
  element.style.visibility = (element.style.visibility == 'visible') ? 'hidden' : 'visible';
}

function sumCartItems() {
  totalPrice = cartPriceArr.reduce( ( sum, item ) => {
    return sum + Number( item )
  }, 0)
  modalTotal.innerHTML = `$ ${totalPrice.toFixed( 2 )}`
}

function emptyCartElements() {
  cartArray = []
  while ( cart.hasChildNodes()) {
    cart.removeChild( cart.firstChild );
  }
}

function clearCart() {
  emptyCartElements()
  cartPriceArr = []
  cartItemsArr = []
  modalTotal.innerHTML = "$0.00"
  cartCounter.innerHTML = cartItemsArr.length
}

addtoCartBtn.forEach( (element) => {
    element.addEventListener( 'click', (element) => {
      let itemDetailsObj = JSON.parse( element.target.dataset.item )
      tempCartArray.push( itemDetailsObj )
      cartArray.push( itemDetailsObj )

      tempCartArray.forEach( element => {
        for ( var key in element ) {
          cartItemsArr.push( key )
          cartPriceArr.push( element[key] )
          let itemRow = document.createElement( 'DIV' );
          cart.appendChild( itemRow );

          let itemName = document.createElement( 'SPAN' );
          itemRow.appendChild( itemName );
          let itemText = document.createTextNode( key );
          itemName.appendChild( itemText );

          let itemPrice = document.createElement( 'SPAN' );
          itemRow.appendChild( itemPrice );
          let itemPriceNode = document.createTextNode( element[key] );
          itemPrice.appendChild( itemPriceNode );

          cartCounter.innerHTML = cartItemsArr.length
        }
      tempCartArray = []
      })
      let sumModalTotal = cartPriceArr.reduce( ( sum, item ) => {
        return sum + Number( item )
      },0)
      modalTotal.innerHTML = `$ ${sumModalTotal.toFixed( 2 )}`
    })
});


openCartBtn.addEventListener( 'click', () => {
  modal()
});

closeBtn.addEventListener( 'click', ( target ) => {
   modal()
});

clearBtn.addEventListener( 'click', () => {
   modal()
   clearCart()
});
