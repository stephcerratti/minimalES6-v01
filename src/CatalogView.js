

// this class is responsible for displaying the product data...
// Perhaps in a carousel.

export default class CatalogView{

    constructor(){
         this.carousel = document.getElementsByClassName("owl-carousel");
        // this.initCarousel();
        //creating a property for theApp, that is null right now.
        this.theApp = null;
        
    }

    initCarousel(){
   
    $(document).ready(function(){
    $('.owl-carousel').owlCarousel({
    rtl:true,
    loop:true,
    margin:10,
    nav:true,
    autoplay:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:4
        }
    }
});
});
}
  
    onClickCartButton(theApp){
        //console.log the event object
        //console.log(e.target.getAttribute("data-sku"));
        //we are declaring the sku and finding it in the event object's target
        //let theSku = e.target.getAttribute("data-sku");
        //this file as theApp property and has a shopping cart, which has a function
        //called addItemToCart, where we could pass the sku.
        // console.log(theApp);
        // this.theApp.shoppingCart.addItemToCart(theSku);

        return function(e){
            console.log(theApp);
            let theSku = e.target.getAttribute("data-sku");
            theApp.shoppingCart.addItemToCart(theSku);
            theApp.shoppingCart.removeItemFromCart(theSku);
            theApp.shoppingCart.initShoppingCart(theSku);
            // if(sessionStorage.getItem("Quantity") == undefined) {
            //     sessionStorage.setItem("Quantity", 1);
            // }
            // else {
            //     let newQuantity = sessionStorage.getItem("Quantity");
            //     newQuantity = parseInt(newQuantity);
            //     newQuantity = newQuantity + 1;
            //     sessionStorage.setItem ("Quantity", newQuantity);
            // }
        }
    }

    addProductsToCarousel(products, theApp){
        this.theApp = theApp;

        if (products === undefined || products == null){
            return ; // do not do anything! there is no data
        }

        for (let p=0; p<products.length; p++){
            let product = products[p];
            console.log(product);
            // each product is a product object
            // use it to create the element

            // create the DIV tag with class 'product-wrapper'
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class","product-wrapper");
            //<div class="product-wrapper"></div>

            // create a new IMG tag. Suggest to add data-sku attribute here too
            // so that if you 'click' on the image, it would pop up a quick-view
            // window and you can use the sku.
            let newImg = document.createElement("img");
            newImg.setAttribute("src", product.image);
            newImg.setAttribute("alt", `${product.name}`); // this works too
            newImg.setAttribute("data-sku",product.sku);

            // create a new Paragraph to show a description
            let newPara = document.createElement("p");
            newPara.setAttribute("class","product-type");
            let newParaTextNode = document.createTextNode(product.longDescription);
            newPara.appendChild(newParaTextNode);

            // create a new H3 tag to show the name
            let newH3Tag = document.createElement("h3");
            let newH3TagTextNode = document.createTextNode(product.name);
            newH3Tag.appendChild(newH3TagTextNode);
            //<h3>TEXT NODE</h3>
            //createTextNode create a space to place text within an element

            let newPricePara = document.createElement("p");
            newPricePara.setAttribute("class","price");
            let newPriceParaTextNode = document.createTextNode(product.regularPrice);
            newPricePara.appendChild(newPriceParaTextNode);

            let quickViewButton = document.createElement("button");
            quickViewButton.setAttribute("id", `qv_${product.sku}`);
            quickViewButton.setAttribute("data-sku", product.sku);
            quickViewButton.setAttribute("type", "button");
            let quickViewTextNode = document.createTextNode("Quick View");
            quickViewButton.appendChild(quickViewTextNode);
            quickViewButton.addEventListener("click", this.showQv(this.theApp) , false);


            let addToCartButton = document.createElement("button");
            addToCartButton.setAttribute("id", `cart_${product.sku}`);
            addToCartButton.setAttribute("data-sku", product.sku);
            addToCartButton.setAttribute("type", "button");
            let addCartTextNode = document.createTextNode("Add to Cart");
            addToCartButton.appendChild(addCartTextNode);
            console.log("how many time am i running")
            //we added the "this" so that it knows to search "this" file for the function
            addToCartButton.addEventListener("click", this.onClickCartButton(this.theApp) ,false);


            //at the top, we have the new elements within the div created.  Below, 
            //we are appending (or placing) the new elements with the data.
            newDiv.appendChild(newImg);
            newDiv.appendChild(newPara);
            newDiv.appendChild(newH3Tag);
            newDiv.appendChild(newPricePara);
            newDiv.appendChild(quickViewButton); // added new quickView button
            newDiv.appendChild(addToCartButton);
            this.carousel[0].appendChild(newDiv);
            let qvButtonId = `#qv_${product.sku}`;
            $(qvButtonId).on("click", function(e){
                console.log("I clicked on the button");
                $(".quick-view").fadeIn();
            $(".qv-close").on("click", function(e) {
                $(".quick-view").fadeOut();
            })

            })
         
        }
        this.initCarousel();

    }
    showQv(products) {
        console.log(products);
        let output = "";
        let QuickView = $('.quick-view');
            //maybe insert something here if the shopping cart is empty:
            //if(sessionStorage.length == 0) {
                //return ;
            //  }
            $(".qv-info").html("");

            for (let i = 0; i < sessionStorage.length; i++) {
                let currentSku = sessionStorage.key(i); //this is a string
                let currentQuantity = sessionStorage.getItem(currentSku); //this is a string
                //we are running a loop within a loop, but there are more efficient ways
                //to do this: there is an array object method called "filter"
                for (let p = 0; p < products.length; p++) {
                    let currentProduct = products[p];
                    let productSku = currentProduct.sku;
                        productSku = productSku.toString();
                    if (productSku == currentSku) {
                        // let image = currentProduct.image;
                        // let name = currentProduct.name;
                        // let price = currentProduct.regularPrice;
                        // += : equals plus
                        output += `<div id="flex-container" class="qv-product-info">
                                    <img class="qv-image" src= "${currentProduct.image}" alt= "${name}">
                                    
                                    <p class="qv-price"> ${currentProduct.regularPrice} </p>
                                    <input id="add" type="number" value=${currentQuantity}>
                                    <button type="button" class="qv-add">Add to Cart</button>
                                    </div>
                                    `;

                    }
                                    // <p class="cart-name"> ${name} </p>
                }
            }
            $('.qv-info').append(output);

    }

}