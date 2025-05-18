const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

let products = [
	{ id: 1, name: "Harry Potter Mug", price: 300 },
	{ id: 2, name: "FIFA 22 PS5", price: 1000 },
	{ id: 3, name: "Goku Super Saiyan Figure", price: 100 },
	{ id: 4, name: "Zelda Breath of the Wild", price: 200 },
	{ id: 5, name: "Valorant Skin", price: 120 },
	{ id: 6, name: "Star Wars Mug", price: 220 },
];

app.get("/products", (req, res) => {
	res.json({
		description: "Products",
		items: products,
	});
});

app.post("/products", (req, res) => {
	const { name, price } = req.body;
	const newProduct = {
		id: products.length + 1,
		name,
		price,
	};
	products.push(newProduct);
	res.json(newProduct);
});

app.put("/products/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const { name, price } = req.body;

	const productIndex = products.findIndex((p) => p.id === id);
	if (productIndex === -1) {
		return res.status(404).json({ message: "Product not found" });
	}

	products[productIndex] = { id, name, price };
	res.json(products[productIndex]);
});

app.delete("/products/:id", (req, res) => {
	const id = parseInt(req.params.id);
	products = products.filter((p) => p.id !== id);
	res.sendStatus(204);
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
