/**Seleccionar todos los elementos que tienen la clase del enlace a "añadir al carrito" btn btn-primary addToCard */

const anadirCarrito = document.querySelectorAll('.addToCard');
//console.log ("anadirCarrito",anadirCarrito ); 

/**Recorrer los enlaces a */

anadirCarrito.forEach((addToCardEnlace)=> {
    addToCardEnlace.addEventListener('click', addToCardClicked);
});

const comprarButton = document.querySelector('.comprarButton')  
//comprarButton.addEventListener('click', comprarButtonClicked);

/**variable global*/
const carritoContenedorProductos = document.querySelector('.shoppingCartItemContainer');

/**Capturar lo que trae al darle click al enlace */
function addToCardClicked(event) {
    const enlace = event.target;
    const card = enlace.closest('.card');
    

   /**Capturar los datos que quiero mostrar */

   const cardTittle = card.querySelector('.card-title').textContent; 
   const cardPrecio = card.querySelector('.card-precio').textContent; 
   const cardImagen = card.querySelector('.card-img-top').src; 
   
   //console.log('al darle click al enlace ', cardTittle, cardPrecio, cardImagen);
   // hasta acá todo bien
  
   //se crea una funcion llamada addCardCarrito
   addItemToShoppingCart(cardTittle, cardPrecio, cardImagen);
   //console.log('++++++++++++++++++++++ ', addCardCarrito);
   
}

/**añadir los elementos que queremos al carrito */

function addItemToShoppingCart(cardTittle, cardPrecio, cardImagen) {
    //console.log( cardTittle, cardPrecio, cardImagen);
    const elementsTitle = carritoContenedorProductos.getElementsByClassName('.shoppingCartItemTitle');

    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemTitle){
            let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
            elementQuantity.value++;
            updateShoppingCartTotal();
            return;
        }
        
    }


    const carritoCardRow = document.createElement('div');
    const CardsItemContent = `
    <div class="row shoppingCartItem">
  
            <div class="col-6">
                <div class="shopping-cart-item card d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <img src=${cardImagen} class="shopping-cart-image">
                    
                    <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${cardTittle}</h6>
                        
                    
                </div>
            </div>  
            

            <div class="col-2">
                <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <p class="item-price mb-0 shoppingCartItemPrice">${cardPrecio} </p>
                </div>
            </div>

            <div class="col-4">
                <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                    <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number" value="1">
                    <button class="btn btn-danger  buttonDelete" type="button">X</button>
                    
                </div>
            </div>
</div> `;

  //console.log("..........------------ ", CardsItemContent)
    
  carritoCardRow.innerHTML =  CardsItemContent;
  carritoContenedorProductos.append(carritoCardRow);

  carritoCardRow.querySelector('.buttonDelete').addEventListener('click', removeShoppingCartItem);
  carritoCardRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanged);

  updateShoppingCartTotal();
}

function updateShoppingCartTotal(){
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
  
        shoppingCartItems.forEach((shoppingCartItem) => {
            const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');
            const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace(' COP', ''));
            
            const shoppingCartItemQuantityElement = shoppingCartItem.querySelectorAll('.shoppingCartItemQuantity');
            
            const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
            
            total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
        });
  
  shoppingCartTotal.innerHTML = `${total.toFixed(2)} $`
}

function removeShoppingCartItem(event){
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();

}

function quantityChanged(event) {
    const input = event.target;
    if (input.value <= 0){
        input.value = 1;
    }
    updateShoppingCartTotal();


    //en ternario seria asi
    //input.value <= 0 ? (input.value = 1): null;
}

function comprarButtonClicked(){
    carritoContenedorProductos.innerHTML = ' ';
    updateShoppingCartTotal();
}