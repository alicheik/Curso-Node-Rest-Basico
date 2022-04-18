const Role = require('../models/role');
const User = require('../models/user');


const esRoleValido = async(role='')=>{
    const exiteRole = await Role.findOne({role});
    if(!exiteRole){
         throw new Error(`El Role ${role} no esta registrado en DB`);
    }
}
const emailExiste = async(email = '')=>{
     const existeEmail = await User.findOne({email});
     if (existeEmail){
          throw new Error(`El Correo: ${email}, ya esta registrado`);
     }
}
const existeUserID = async(_id)=>{
     
     const existeUser = await User.findById(_id);
     if (!existeUser){
          throw new Error(`El id: ${_id}, no existe`);
     }
}
module.exports= {
                    esRoleValido,
                    emailExiste,
                    existeUserID,
                }