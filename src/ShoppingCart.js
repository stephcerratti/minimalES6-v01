/**
 * Created by Edward_J_Apostol on 2017-01-29.
 */

export default class ShoppingCart{

    constructor(){
        console.log("creating shopping cart");
        if(Storage){
            this.initShoppingCart();
        } else {
            console.log("Error! SessionStorage not supported in your browser!");
        }
    }

    initShoppingCart(sku){
        if (sessionStorage.getItem(sku) !== "undefined") { 
            if (sessionStorage.quantity) {
                sessionStorage.quantity = Number(sessionStorage.quantity)+1;
            } else {
                sessionStorage.quantity = 0;
            }
        }

        sessionStorage.setItem("Quantity", 1);
        console.log("finished creating shopping cart");
    }

    addItemToCart(sku){
        console.log("add item to cart");
        let theSku = sku;
        if (sessionStorage.getItem(sku) == undefined) {
            sessionStorage.setItem(sku, 1);
            return;
        }
        //loop through the skus until it finds the matching sku
        else {
            for (let i = 0; i <sessionStorage.length; i++) {
                let currentSku = sessionStorage.key(i);
                if (currentSku.toString() == theSku.toString()) {
                    let currentValue = sessionStorage.getItem(currentSku);
                    currentValue = parseInt(currentValue)+1;
                    //currentValue = currentValue + 1;
                    sessionStorage.setItem(theSku, currentValue);
                }
                
            }
        }
    }


    removeItemFromCart(sku){
        console.log("remove item");

        for (let i=0; i<sessionStorage.length; i++) {
            let currentSku = sessionStorage.key(i);
            let currentQuantity = sessionStorage.getItem(currentSku);
            let removeButton = document.getElementById("removeItem"+currentSku);

            if (removeButton !== null) {
                removeButton.addEventListener("click", this.deleteItem(theApp), false );
            }
            console.log(removeButton);
            }

    }

    deleteItem(theApp) {
        let product = theApp.products;
        return function(e) {
            let theSku = e.target.getAttribute("name");
            console.log(theSku);
            let item = sessionStorage.getItem(theSku);
            sessionStorage.removeItem(theSku);
            theApp.ShoppingCartView.showCartPopup(products, theApp);
            let newQuantity = sessionStorage.getItem("Quantity");
            newQuantity = newQuantity - item;

            sessionStorage.setItem("Quantity", newQuantity);
            let currentValue = sessionStorage.getItem("Quantity");
            $
        }
    }

    updateQuantityofItemInCart(sku,qty){
        

    }

    clearCart(){
        console.log("clear cart")    
        sessionStorage.clear();
        $(".product-info").html("");
    }
}
  

   




