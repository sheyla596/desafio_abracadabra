const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`El servidor está inicializado en el puerto http://localhots:${port}`);
  });


// middleware carpeta pública del servidor assets 
app.use(express.static("assets"));

// Crear un arreglo de nombres
const usuarios = ["Juan", "Jocelyn", "Astrid", "Maria", "Ignacia", "Javier", "Brayan"];

// Ruta raiz
app.get('/', (req, res) => {
    res.send('Pagina de inicio');
});

// Ruta para devolver el arreglo de nombres en formato JSON
app.get('/abracadabra/usuarios', (req, res) => {
    res.json(usuarios);
});


// Middleware para verificar si el usuario existe
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    const usuario = req.params.usuario.toLowerCase();
    const usuarioValido = usuarios.some(
        (nombre) => nombre.toLowerCase() === usuario
    );

    usuarioValido
    ? next()
    : res.sendFile(__dirname + '/index.html');
});


// Ruta para devolver la imagen del conejo o de Voldemort
app.get("/abracadabra/conejo/:n", (req, res) => {
    const numero = Math.floor(Math.random() * (5-1)) + 1;
    const n = req.params.n;
    if (n == numero) {
        res.sendFile(__dirname + '/assets/conejito.jpg');
    } else {
        res.sendFile(__dirname + '/assets/voldemort.jpg');
    }
});

// Ruta generica
app.get('*', (req, res) => {
    res.send('Esta página no existe...');
});
