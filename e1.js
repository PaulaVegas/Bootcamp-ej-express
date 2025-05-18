const express = require("express");
const app = express();
const puerto = 3001;

app.listen(puerto, () => {
	console.log(`Servidor levantado en el puerto ${puerto}`);
});
