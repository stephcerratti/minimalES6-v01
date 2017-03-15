export default class ShoppingCartView {
	constructor(){}
	showCartPopup(products) {
		console.log(products);
		let output = "";
		let CartView = $('.cartView');
			//maybe insert something here if the shopping cart is empty:
			//if(sessionStorage.length == 0) {
				//return ;
			//	}
			$(".product-info").html("");

			for (let i = 0; i < sessionStorage.length; i++) {
				let currentSku = sessionStorage.key(i); //this is a string
				let currentQuantity = sessionStorage.getItem(currentSku); //this is a string
				for (let p = 0; p < products.length; p++) {
					let currentProduct = products[p];
					let productSku = currentProduct.sku;
						productSku = productSku.toString();
					if (productSku == currentSku) {
						// let image = currentProduct.image;
						// let name = currentProduct.name;
						// let price = currentProduct.regularPrice;
						// += : equals plus
						output += `<div id="flex-container" class="product-info">
									<img class="cart-image" src= "${currentProduct.image}" alt= "${name}">
									<p class="cart-title"> ${currentProduct.manufacturer} </p>
									<p class="cart-price green-text">$${currentProduct.regularPrice} </p>
									<input id="add" type="number" value=${currentQuantity}>
									<button type="button" class="cart-update">Update</button>
									<button type="button" id="removeItem" class="cart-remove">Remove</button>
									</div>
									`;

					}
				}
			}
			$('.productView').append(output);

	}
}
	
// $(document).ready(function(){
	
// let cartQuantity = 0;

// $(".addToCart").on("click", function (){
//     cartQuantity += 1;
//     console.log("i work");
//     $(".cart-count").html(cartQuantity);                   
//     $("#cart-quantity").show(); 
//  });

// });

