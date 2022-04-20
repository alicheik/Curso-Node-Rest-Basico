const {request,response}=require('express');
const bcryptjs =require('bcryptjs');
const User =require('../models/user');

const usuariosGet=async(req=request,res=response)=>{
    //const {query,name='no name',apikey,page=1,limit} = req.query;
    const {limit=5,desde=0}= req.query;
    const query ={state:true};
    
    // const users= await User.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limit));

    // const total =await User.countDocuments(query);

    const [total,users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limit)),
    ]);

    res.json({
        total,
        users
    });
}
const usuariosPut= async(req =request,res=response)=>{
    const {id} =req.params;
    const {_id,password,google,email,...resto}=req.body;

    // Validar contra bd
    if(password){
    // Encriptar la contrase;a
    const salt = bcryptjs.genSaltSync();
    resto.password =bcryptjs.hashSync(password,salt);
    }
    
    const userDB = await User.findByIdAndUpdate(id,resto);


    res.json(userDB);
}
const usuariosPost=async(req=request,res=response)=>{
    

    const {name,email,password,role} = req.body;
    const user = new User({name,email,password,role});

    //Verificar que el correo existe
    

    // Encriptar la contrase;a
    const salt = bcryptjs.genSaltSync();
    user.password =bcryptjs.hashSync(password,salt);
    // Guardar en BD
    
    await user.save();
    res.json({
        user
    });
}
const usuariosPatch=(req=request,res=response)=>{
    
    res.json({
        msg:'Patch API - controller'
    });
}
const usuariosDelete= async(req=request,res=response)=>{
    //console.log(req.params);
    
    const {id} = req.params;
    
    //Borrado Fisico
    //const usuario = await User.findByIdAndDelete(id);
    const user = await User.findByIdAndUpdate(id,{state:false});
    //console.log(user);
    
    res.json({user});
}


module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}