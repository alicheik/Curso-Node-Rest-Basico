const bcryptjs = require("bcryptjs");
const { response } = require("express");
const User = require('../models/user');
const { generarJWT } = require("../helpers/generar-jwt");



const login = async(req = request,res = response)=>{
    const {email,password}=req.body;
    try {
        //  verificar si el correo existe
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            })
        }
        //  si el usuario esta activo
        if(user.state === false){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - estado false'
            })
        }
        //  verificar la contrasena
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos -Password'
            })
        }
        //  generar JWT
        
        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

module.exports ={
    login
}