/**
 * Created by Edward_J_Apostol on 2017-01-27.
 */

export default class BestBuyWebService{

    constructor(){
        this.url ="";
        this.apiKey = "";
        this.productData = null;
        this.products = null;
    }


    getData(theApp){
        // theApp is a reference to the main app
        // we can pass information to it, including data
        // that is returned from this service

        //serviceChannel is the connection between our site and BestBuy

        let serviceChannel = new XMLHttpRequest();
        let url = this.url;

        /*
        // *** To solve the issue of passing the data back to the main app...
        // *** and eventually, to catalogView
        // *** You could the addEventListener to call
        // *** a different function which will have both
        // *** the event object and dataPlaceHolder as parameters
        // *** see http://bit.ly/js-passmoreargsevent
         */

         //listen to when the state changes in the serviceChannel
         //we are passing theApp to the resultsPreprocessor function (which happens when the
         //event occurs)
        serviceChannel.addEventListener("readystatechange",this.resultsPreprocessor(theApp),false);
        //we need to open the serviceChannel to get the data from BestBuy (the URL), "GET" is what will grab
        //the data. "Ture" = the browser will continue to do things while it waits for the data.
        serviceChannel.open("GET",url,true);
        serviceChannel.send();
    }

    //resultsPreprocessor is the "middle-man" in this scenario 
    resultsPreprocessor(theApp){
        /*the addEventListener function near line 29 requires a proper function (an event handler) to be returned so we can create one to be returned.
        */
        // let thisService = this BestBuywebservice file
        let thisService = this; // a reference to the instance created from this class
        //
        let eventHandler = function(evt){
            //we can't just write "this" to call on the bestbuywebservice file, since
            //we would be calling it within a funciton, so it would only exist within this
            //function. Therefore, we use thisServie, which we declared as the entire
            //BestBuywebservice above. 
            thisService.results(evt,theApp)
        };
        return eventHandler
    };

    results(evt,theApp){

        if (evt.target.readyState == 4 && evt.target.status == 200){
            // assign this instance's productData to be the responseText

            //bestbuywebservce has the product data, and it matches the event target, so we are
            //assigning it/storing it
            this.productData = evt.target.responseText;
            // assign the app's productData to be the responseText too

            //now the app has a copy of the bestbuy api data as well; we assigned it below:
            theApp.productData = evt.target.responseText;
            // tell the app to prepare the catalog
            // there is another way to do it, with custom
            // events. but this will work for now.

            //below we are telling theApp file to prepare the catalog
            theApp.prepCatalog();
            // console.log(evt.target.responseText);
            // return evt.target.responseText;
        }
    }

    getProducts(){
        // this method explicity gets the products property
        // from the JSON object. it assumes you have the JSON data
        if(this.productData!=null){
            //if there is product data, then PARSE the data (convert to array of objects)
           let jsonData = JSON.parse(this.productData);

           //gets another copy of the data, which is explicity the PRODUCTS (not all the other
           //data)
           this.products = jsonData.products;

           //return just the PRODUCTS, which gets stored in the products property of the app.
           return this.products;
        }
        //return the data to theApp.
        return; // if we have no data, return nothing
    }
}
