export default class CatalogView{

    constructor(){
        this.carousel = document.getElementsByClassName("owl-carousel");
        this.theApp = null;  
    }

    initCarousel(){
        $(document).ready(function(){
            $('.owl-carousel').owlCarousel({
                rtl:true,
                loop:false,
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

        $(function() {
            $('.sameHeight').matchHeight({byRow:false});
        });  
        });
    }
  
    onClickCartButton(theApp){
        return function(e){
            console.log(theApp);
            let theSku = e.target.getAttribute("data-sku");
            theApp.shoppingCart.addItemToCart(theSku);
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
 
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class","product-wrapper");

            let newImg = document.createElement("div");
            newImg.setAttribute("style",`background-image: url('${product.image}');height:200px; 
            background-size:contain;background-repeat:no-repeat;background-position:center;`);
            newImg.setAttribute("alt", `${product.name}`); // this works too
            newImg.setAttribute("data-sku",product.sku);

            // create a new Paragraph to show a description
            // let newPara = document.createElement("p");
            // newPara.setAttribute("class","product-type");
            // let newParaTextNode = document.cproduct.longDescriptionreateTextNode();
            // newPara.appendChild(newParaTextNode);

            let newH3Tag = document.createElement("h3");
            newH3Tag.setAttribute("class", "light-grey-text product-name font-robmono");
            let newH3TagTextNode = document.createTextNode(product.name);
            newH3Tag.appendChild(newH3TagTextNode);
            //<h3>TEXT NODE</h3>
            //createTextNode create a space to place text within an element

            let newPricePara = document.createElement("p");
            newPricePara.setAttribute("class", "price green-text font-robmono");
            let newPriceParaTextNode = document.createTextNode(product.regularPrice);
            newPricePara.appendChild(newPriceParaTextNode);

            let addToCartButton = document.createElement("button");
            addToCartButton.setAttribute("id", `cart_${product.sku}`);
            addToCartButton.setAttribute("class", "addToCart uppercase font-robmono");
            addToCartButton.setAttribute("data-sku", product.sku);
            addToCartButton.setAttribute("type", "button");
            let addCartTextNode = document.createTextNode("Add to Cart");
            addToCartButton.appendChild(addCartTextNode);
            console.log("how many time am i running")
            //we added the "this" so that it knows to search "this" file for the function
            addToCartButton.addEventListener("click", this.onClickCartButton(this.theApp) ,false);

            let quickViewButton = document.createElement("button");
            quickViewButton.setAttribute("id", `qv_${product.sku}`);
            quickViewButton.setAttribute("class", "qv-button uppercase font-robmono");
            quickViewButton.setAttribute("data-sku", product.sku);
            quickViewButton.setAttribute("type", "button");
            let quickViewTextNode = document.createTextNode("Quick View");
            quickViewButton.appendChild(quickViewTextNode);
            quickViewButton.addEventListener("click", this.showQv(this.theApp) , false);

    
            //at the top, we have the new elements within the div created.  Below, 
            //we are appending (or placing) the new elements with the data.
            newDiv.appendChild(newImg);
            newDiv.appendChild(newImg);
            newDiv.appendChild(newH3Tag);
            newDiv.appendChild(newPricePara);
            newDiv.appendChild(quickViewButton); // added new quickView button
            newDiv.appendChild(addToCartButton);
            this.carousel[0].appendChild(newDiv);
            
            let qvButtonId = `#qv_${product.sku}`;
            $(qvButtonId).on("click", this, function(e){
                // console.log("I clicked on the button");
                // console.log(e.data);
                let theSku = e.target.getAttribute("data-sku");
                // console.log(theSku);
                e.data.showQv(e.data.theApp.products,theSku);
                $(".quick-view").fadeIn();
                $(".qv-close").on("click", function(e) {
                $(".quick-view").fadeOut();
                });
            });  
        }

    this.initCarousel();

    }
   
    showQv(products,theSku) {
        console.log(theSku);
        console.log(products);

        let output = "";
        let QuickView = $('.quick-view');

        $(".qv-info").html("");

        for (let p = 0; p < products.length; p++) {
            let currentProduct = products[p];
            let productSku = currentProduct.sku;
                productSku = productSku.toString();
            if (productSku == theSku) {
                console.log("i am here"); 
                output += `<div class="qv-flex-container qv-info">
                                <img class="qv-image" src= "${currentProduct.image}" alt= "${name}">
                                <h4 class="qv-title light-grey-text font-robmono uppercase">${currentProduct.name}</h4>
                            </div>
                            <div class="qv-text">
                                <p class="qv-price green-text font-robmono"> ${currentProduct.regularPrice} </p>
                                <p class="qv-description light-grey-text">${currentProduct.longDescription}</p>
                            </div>
                            <button type="button" id="qv-${theSku}" class="qv-add addToCart uppercase font-robmono">Add to Cart</button>
                            `;
            }
        }

        $('.qv-info').append(output);

        if ( document.getElementById(`qv-${theSku}`) === null) { return } else {   
            let qvCartButton = document.getElementById(`qv-${theSku}`);
            console.log(qvCartButton);
            qvCartButton.addEventListener("click", this.quickAddToCart(theSku,this.theApp) , false);
        }
    }

    quickAddToCart(theSku,theApp) {
        return function(e) {
        
        if (sessionStorage.getItem(theSku) == undefined){
            sessionStorage.setItem(theSku, 1);
            return
        }
    // console.log('i am here in the quickview cart Button');
        else {
            for (let i = 0; i < sessionStorage.length; i++) {
                let currentSku = sessionStorage.key(i);
                let currentQuantity = sessionStorage.getItem(currentSku);
                if (theSku.toString() == currentSku.toString()) {
                    currentQuantity = parseInt(currentQuantity) + 1;
                    sessionStorage.setItem(currentSku,currentQuantity);
                }
            }
        }
        }
    }

}