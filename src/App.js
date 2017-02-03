/**
 * Created by Edward_J_Apostol on 2017-01-28.
 */

 //the application needs some other files to work: webservice to get some data, catalog view to
 //see the products, and a shopping cart to manage the items/products. 

import BestBuyWebService from './BestBuyWebService';
import CatalogView from './CatalogView';
import ShoppingCart from './ShoppingCart';
import ShoppingCartView from './ShoppingCartView';


export default class App {

    //the constructor function ALWAYS EXISTS- usually calls on the init function that contains
    //all the steps to perform the task.
    constructor(){
        this.productData = null; // this will store all our data
        this.products = null; // stores specifically the products
        this.catalogView = new CatalogView(); // this will display our data
        this.shoppingCart = new ShoppingCart();
        this.shoppingCartView = new ShoppingCartView();
        // this.
        // call the initBestBuyWebService to initialize the
        // BestBuy Web Service and return the data
        this.initBestBuyWebService();
        this.initShoppingCart();
        // this.initShoppingCartView();
    }

    //in this init function
    initBestBuyWebService(){
        //this app's bestbuywebservice is an instance of the BestBuy Web Service
        //go to bestbuywebservice and run all its properties and functions
        this.bbws = new BestBuyWebService();
        //this app's webservice's api key is:
        // use your own API key for this (the one from Cody)
        this.bbws.apiKey = "8ccddf4rtjz5k5btqam84qak";

        //this app's webservice's url to obtain the product data is:
        // this uses 'backticks' for long multi-line strings
        this.bbws.url = `https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=${this.bbws.apiKey}&format=json`;

        // pass the reference to this app to store the data
        //passing the webservice to receive the data, which it grabs and then returns it to
        //this app. 
        //this bestbuy webservice is receiving the
        //the bestbuy webservice needs to know about THIS app- it needs the products data and
        //the products.  Those properties need to be filled with values.
        this.bbws.getData(this);
        //when we run getData, we are passing the app.js to BestBuyWebservice to populate the
        //list of products in the app. 

    }

    prepCatalog(){
        // use this console.log to test the data
        // console.log(this.productData);

        //if there is actually product data, then this (theApp)
                if(this.productData!=null){
            // only get the products property (for now)
            // this code was copied from SimpleHTTPRequest.html
            this.products = this.bbws.getProducts();

        }

        this.showCatalog();
}
    showCatalog() {

        // populate the catalog only if there are products
        if (this.productData != null) {
            //pass the products to the carousel
            this.catalogView.addProductsToCarousel(this.products,this);
            // this.catalogView.showCatalog();
        }
    }

    initShoppingCart() {
        $(document).on('click', '.cart', this, function(event){
            console.log(event.data);
            let theApp = event.data;
            theApp.shoppingCartView.showCartPopup(theApp.products);
            $(".cartView").fadeIn();     
        })
         $(document).on('click', '.close', this, function(event){
            $(".cartView").fadeOut();
        }); 
    }
}

 // event.data.theApp.ShoppingCart
            // $("#div2").fadeIn("slow");
            // $("#div3").fadeIn(3000);


