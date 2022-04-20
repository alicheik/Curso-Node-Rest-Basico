const express = require('express')
const cors =require('cors');

const { dbConecction } = require('../database/config');


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutePath='/api/users';
        this.authPath ='/api/auth'
        //Conectar a BD
        this.conectarDB();

        //Midelwares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConecction()
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y Parseo del body
        this.app.use(express.json());
        //Directorio Publico
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usersRoutePath, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto ',this.port);
        });
    }
}

module.exports =Server;

