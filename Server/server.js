const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurar multer para guardar archivos en 'Servers/fotos_solicitudes'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'fotos_solicitudes'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Ruta para subir la imagen
app.post('/upload-image', upload.single('imagen'), (req, res) => {
    if (req.file) {
        res.status(200).send({ message: 'Imagen subida exitosamente', file: req.file });
    } else {
        res.status(400).send({ message: 'Error al subir la imagen' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
