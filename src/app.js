import express from 'express';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import exphbs from 'express-handlebars';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import viewsRouter from './routes/views.js';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const server = http.createServer(app);
const io = new Server(server);


// Configurar el motor de plantillas Handlebars
app.engine('.handlebars', exphbs());
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('.handlebars', exphbs({
  defaultLayout: false,
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));


// Middleware para parsear el cuerpo de las solicitudes a JSON
app.use(express.json());

// Middleware para parsear los formularios HTML
app.use(express.urlencoded({ extended: false }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/views', viewsRouter); 


// Socket.io
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');

  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado');
  });
});

const PORT = 27017;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

/* --------------------------------MONGO CONEXIONES --------------------------------*/ 

// Conexión a la base de datos de MongoDB
const dbUrl = 'mongodb://localhost:27017/ecommerce'; // Reemplaza 'ecommerce' con el nombre de tu base de datos
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Verificar si la conexión fue exitosa
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB.');
});

// Configuración de Handlebars y vistas
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});