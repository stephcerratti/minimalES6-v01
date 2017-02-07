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
        //this "helperClick" is just listening for stuff/clicks - will fire all the
        // jquery on.("click")
        //document.on.("click")
        //this."helperClick()"
        //function showQuickView(item) - pass the item data
        //a.stringify();
        // $("")

        console.log("finished creating shopping cart");
    }

    addItemToCart(sku){
        console.log(this);
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
        //reset current quantity to zero
        //if quantity is zero, display none.
    }

    updateQuantityofItemInCart(sku,qty){

    }

    // clearCart(){
    //     sessionStorage.clear();
    //     $("cartView").html("");
    // }
}
  

   




