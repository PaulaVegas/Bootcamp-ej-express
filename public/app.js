const path = window.location.pathname;
const title = document.getElementById("title");

if (path.endsWith("products.html")) {
	const list = document.getElementById("product-list");

	function loadProducts() {
		axios.get("/products").then((res) => {
			list.innerHTML = "";
			res.data.items.forEach((product) => {
				const li = document.createElement("li");
				li.innerHTML = `
          ${product.name} - $${product.price}
          <a href="edit.html?id=${product.id}">Edit</a>
          <button onclick="deleteProduct(${product.id})">Delete</button>
        `;
				list.appendChild(li);
			});
		});
	}

	window.deleteProduct = function (id) {
		axios.delete(`/products/${id}`).then(loadProducts);
	};

	loadProducts();
}

if (path.endsWith("edit.html")) {
	const urlParams = new URLSearchParams(window.location.search);
	const productId = urlParams.get("id");

	const nameInput = document.getElementById("name");
	const priceInput = document.getElementById("price");
	const saveBtn = document.getElementById("save-btn");

	if (productId) {
		title.textContent = "Edit Product";

		axios.get("/products").then((res) => {
			const product = res.data.items.find((p) => p.id == productId);
			if (product) {
				nameInput.value = product.name;
				priceInput.value = product.price;
			} else {
				alert("Product not found");
			}
		});

		saveBtn.addEventListener("click", () => {
			const updated = {
				name: nameInput.value,
				price: parseFloat(priceInput.value),
			};

			axios.put(`/products/${productId}`, updated).then(() => {
				window.location.href = "products.html";
			});
		});
	} else {
		title.textContent = "Add New Product";

		saveBtn.addEventListener("click", () => {
			const newProduct = {
				name: nameInput.value,
				price: parseFloat(priceInput.value),
			};

			axios.post("/products", newProduct).then(() => {
				window.location.href = "products.html";
			});
		});
	}
}
