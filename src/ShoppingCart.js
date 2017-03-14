/**
 * Created by Edward_J_Apostol on 2017-01-29.
 */

export default class ShoppingCart{

    constructor(){
        console.log("creating shopping cart");
        if(Storage){
            // you can create a shoppingCart!
            this.initShoppingCart();
        } else
        {
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

    }

    updateQuantityofItemInCart(sku,qty){

    }

    clearCart(){
        console.log("clear cart")    
        sessionStorage.clear();
        $(".product-info").html("");
    }
}
  

   




