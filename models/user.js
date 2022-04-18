
const {Schema,model}=require('mongoose');
const UserSchema =Schema({
    name:{
        type:String,
        required:[true,'El nombre es Obligatorio']
    },
    email:{
        type:String,
        required:[true,'El email es Obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'El Password es Obligatorio']
    },
    img:{
        type:String,
    },
    role:{
        type:String,
        required:[true,'El rol es Obligatorio'],
        //enum:['ADMIN_ROLE','USER_ROLE']
    },
    state:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});

UserSchema.methods.toJSON = function(){
    const {__v,password,...user}= this.toObject();
    return user
}

module.exports = model('user',UserSchema);