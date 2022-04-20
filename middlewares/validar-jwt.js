const {request, response } = require('express');
const jwt = require('jsonwebtoken');
const { usuariosDelete } = require('../controllers/user');

const User = require('../models/user')

const validateJWT = async (req=request, res = response, next)=>{
    const token =req.header('x-token');

    if (!token){
        return res.status(401).json({
            msg: 'No hay Token en la peticion'
        });
    }

    try {
        const {uid} = jwt.verify(token,process.env.SECRETOPRIVATEKEY);
        
        //leer el usuaio  que corresponde al uid
        const user = await User.findById(uid);
        //verificar si devuelve undefined
        if(!user){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            });
        }
        //Verificar si el uid tiene estatus =true (borrado)

        if(!user.state){
            return res.status(400).json({
                msg:'Token no valido - usuario con status false'
            });
        }
        req.user =user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
        
    }

    next();
    
}

module.exports ={
    validateJWT
}