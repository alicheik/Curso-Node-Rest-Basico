require('colors');
const mongoose =require('mongoose');

const dbConecction = async()=>{
    try {
        // console.log(process.env.MONGODB_CNN);
        
        await mongoose.connect(process.env.MONGODB_CNN,{
            // userNewUrlParser:true,
            // useUnifiendTopology:true,
            // useCreateIndex: true,
             //useFindAndModify:false
        });

        console.log('Base de Datos online'.rainbow);
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la BD');
    }
}

module.exports ={
    dbConecction
}