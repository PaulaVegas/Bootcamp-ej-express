const express = require("express");
const app = express();
const puerto = 3000;

app.use(express.json());

// Lista inicial de productos
let products = [
	{ id: 1, nombre: "Taza de Harry Potter", precio: 300 },
	{ id: 2, nombre: "FIFA 22 PS5", precio: 1000 },
	{ id: 3, nombre: "Figura Goku Super Saiyan", precio: 100 },
	{ id: 4, nombre: "Zelda Breath of the Wild", precio: 200 },
	{ id: 5, nombre: "Skin Valorant", precio: 120 },
	{ id: 6, nombre: "Taza de Star Wars", precio: 220 },
];

// Mostrar todos los productos
app.get("/products", (req, res) => {
	res.json({
		description: "Productos",
		items: products,
	});
});

// Añadir producto
app.post("/products", (req, res) => {
	const nuevoProducto = req.body;
	products.push(nuevoProducto);
	res.json({ mensaje: "Producto añadido", producto: nuevoProducto });
});

// Actualizar producto
app.put("/products/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const index = products.findIndex((p) => p.id === id);
	if (index !== -1) {
		products[index] = { ...products[index], ...req.body };
		res.json({ mensaje: "Producto actualizado", producto: products[index] });
	} else {
		res.status(404).json({ mensaje: "Producto no encontrado" });
	}
});

// Eliminar producto
app.delete("/products/:id", (req, res) => {
	const id = parseInt(req.params.id);
	products = products.filter((p) => p.id !== id);
	res.json({ mensaje: "Producto eliminado" });
});

// Filtro por precio exacto
app.get("/products/precio/:precio", (req, res) => {
	const precio = parseFloat(req.params.precio);
	const filtrados = products.filter((p) => p.precio === precio);
	res.json(filtrados);
});

// Filtro de rango entre 50 y 250
app.get("/products/rango", (req, res) => {
	const filtrados = products.filter((p) => p.precio >= 50 && p.precio <= 250);
	res.json(filtrados);
});

// Filtro por ID
app.get("/products/id/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const producto = products.find((p) => p.id === id);
	res.json(producto || { mensaje: "Producto no encontrado" });
});

// Filtro por nombre (parcial)
app.get("/products/nombre/:nombre", (req, res) => {
	const nombre = req.params.nombre.toLowerCase();
	const producto = products.find((p) =>
		p.nombre.toLowerCase().includes(nombre)
	);
	res.json(producto || { mensaje: "Producto no encontrado" });
});

app.listen(puerto, () => {
	console.log(`Servidor levantado en el puerto ${puerto}`);
});
