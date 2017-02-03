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
						let image = currentProduct.image;
						let name = currentProduct.name;
						let price = currentProduct.price;
						// += : equals plus
						output += `<div id="flex-container" class="product-info">
									<img class="cart-image" src= "${image}" alt= "${name}">
									<p class="cart-name"> ${name} </p>
									<p class="cart-price"> ${price} </p>
									<form class="cart-quantity"> ${currentQuantity} </form>
									</div>`;
					}

				}
			}
			$('.cartView').append(output);
	}

}