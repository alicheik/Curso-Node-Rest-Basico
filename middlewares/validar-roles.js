const {request,response}=require('express');
const role = require('../models/role');
const { notify } = require('../routes/user');

const esAdminRole = (req=request,res=response,next)=>{
    //req.user viene porque en validar-jwt se confirmo el token y se mando el usuario autorizado al request
    if(!req.user){
        return res.status(500).json({
            msg:'Se quiere verificar el rol sin validar el token primero'
        })
    }
    const {role,name}=req.user;
    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} no es administrador - No tiene permisos`
        });
    }

    next();
}

const tieneRole = (...roles)=>{
    return (req=request,res=response,next)=>{
      
        if(!req.user){
            return res.status(500).json({
                msg:'Se quiere verificar el rol sin validar el token primero'
            });
        }
        
    
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
            //msg:'El servicio requiere uno de estos roles'
            msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }
        
        next();
    
    }
}

module.exports={
    esAdminRole,
    tieneRole
}