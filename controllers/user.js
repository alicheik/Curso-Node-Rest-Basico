const {request,response}=require('express')


const usuariosGet=(req=request,res=response)=>{
    const {query,name='no name',apikey,page=1,limit} = req.query;
    res.json({
        msg:'get API - controller',
        query,
        name,
        apikey,
        page,
        limit,
    });
}
const usuariosPut=(req =request,res=response)=>{
    const {id} =req.params;
    res.json({
        msg:'Put API - controller',
        id
    });
}
const usuariosPost=(req=request,res=response)=>{
    
    const {nombre,edad} = req.body;

    res.json({
        msg:'Post API - controller',
        nombre,
        edad,
    });
}
const usuariosPatch=(req=request,res=response)=>{
    
    res.json({
        msg:'Patch API - controller'
    });
}
const usuariosDelete=(req=request,res=response)=>{
    const {id} = req.params;
    res.json({
        msg:'Delete API - controller',
        id
    });
}


module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}