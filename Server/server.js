const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000; // Cambia el puerto si es necesario

// Crear carpeta para guardar las imágenes si no existe
const uploadDir = path.join(__dirname, 'fotos_solicitudes');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configurar multer para guardar archivos en la carpeta especificada
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Cambiar aquí a la carpeta que deseas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Renombrar el archivo para evitar colisiones
    }
});

const upload = multer({ storage: storage });

// Middleware para permitir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para manejar la carga de imágenes
app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        console.log(`Imagen subida: ${req.file.filename}`);
        return res.status(200).json({ message: 'Imagen subida exitosamente' });
    } else {
        return res.status(400).json({ message: 'No se subió ninguna imagen' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
