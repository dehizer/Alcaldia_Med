/**Seleccionar todos los elementos que tienen la clase del enlace a "añadir al carrito" btn btn-primary addToCard */
// console.log();

const anadirCarrito = document.querySelectorAll('.addToCard');
const carritoContenedorProductos = document.querySelector('.shoppingCartItemsContainer');

const BotonComprar = document.querySelector('.botonDeCompra');
BotonComprar.addEventListener('click', comprarButtonClicked )

anadirCarrito.forEach((addToCardEnlace) =>{
    addToCardEnlace.addEventListener('click', addToCardClicked);
});

/**Capturar lo que trae al darle click al enlace */
function addToCardClicked(evento) {

    const enlace = evento.target;
    const card = enlace.closest('.card');
    const cardTitulo = card.querySelector('.card-title').textContent; 
    const cardPrecio = card.querySelector('.card-precio').textContent; 
    const cardImagen = card.querySelector('.card-img-top').src; 

    addItemToShoppingCart(cardTitulo, cardPrecio, cardImagen);
    
}

function addItemToShoppingCart(cardTitulo, cardPrecio, cardImagen) {

    //esto me falta, no me fucniona y organizar los estilos
    const elementosTitulo = carritoContenedorProductos.getElementsByClassName('card-title');
    //console.log(`estos son los tt ++ ${cardTitulo}`)
    //console.log(elementosTitulo)
    
    for (let i = 0; i < elementosTitulo.length; i++) {
        if (elementosTitulo[i].innerText === cardTitulo) {
            //los parentElment para que del title suba a los div anteriores (son 3)
            let elemetoCantidad = elementosTitulo[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
            elemetoCantidad.value++;
            ActualizarTotalComprasDelCarrito();
            return;
        }  
    } 
    const filaItemCarrito = document.createElement('div');
    const ContenidoDelItemDeCartas = `

            <div class="row itemDeCompra" style="border: none solid; margin-auto ">

                <div class="col-6">
                    <div class="shopping-cart-item card d-flex align-items-center h-100 border-bottom pb-2 pt-3" style="width : 9rem; heigth : 10rem;
                    margin-left: 8rem">
                        <img src=${cardImagen} class="card-img-top" style="width : 5rem; heigth : 10rem" >
                        <h6 class="shopping-cart-item-title card-title text-truncate ml-3 mb-0">${cardTitulo}</h6> 

                    </div>

                </div>       

                <div class="col-2">
                    <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                        <p class="item-price mb-0 card-precio">${cardPrecio} </p>
                        
                    </div>  
                </div>

                <div class="col-4">
                    <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                        <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number" value="1" style="width : 70px; heigth : 5px" >
                        <button class="btn btn-danger  buttonDelete" type="button" style="margin-right : 80px" ><i class="fa-solid fa-trash-can"></i></button>
                                               
                    </div>
                </div>
            </div> 

        `; 

        filaItemCarrito.innerHTML =  ContenidoDelItemDeCartas;
        carritoContenedorProductos.append(filaItemCarrito);

        //console.log(carritoContenedorProductos);
        filaItemCarrito.querySelector('.buttonDelete').addEventListener('click', EliminaItemDelCarritoDeCompras);
        filaItemCarrito.querySelector('.shoppingCartItemQuantity').addEventListener('change', cantidadCambiada); 

        ActualizarTotalComprasDelCarrito();

}

function EliminaItemDelCarritoDeCompras(evento) {
    const buttonClicked = evento.target;
    buttonClicked.closest('.itemDeCompra').remove();
    ActualizarTotalComprasDelCarrito();
}

function cantidadCambiada(evento) {

    const input = evento.target;
    input.value <= 0 ? (input.value = 1): null;
    ActualizarTotalComprasDelCarrito();

    
}

function ActualizarTotalComprasDelCarrito(){

    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
    const itemDeCompras = document.querySelectorAll('.itemDeCompra');
    //console.log( itemDeCompras);
  
        itemDeCompras.forEach((itemDeCompra) => {
            
            const itemDeCompraPriceElement = itemDeCompra.querySelector('.card-precio');
            //console.log( itemDeCompraPriceElement)
            const itemDeCompraPrice = Number(itemDeCompraPriceElement.textContent.replace(' $',' '))*1000;
            //console.log( itemDeCompraPrice)
            
            const itemDeCompraQuantityElement = itemDeCompra.querySelector('.shoppingCartItemQuantity');
            //console.log( itemDeCompraQuantityElement)
            
            const itemDeCompraQuantity = Number(itemDeCompraQuantityElement.value);
            //console.log( itemDeCompraQuantity)
            
            total = total + itemDeCompraPrice * itemDeCompraQuantity;
        });
  
  shoppingCartTotal.innerHTML = `${total.toFixed(2)} $`

    
}

function comprarButtonClicked(){
    carritoContenedorProductos.innerHTML = ' ';
    ActualizarTotalComprasDelCarrito();
}   