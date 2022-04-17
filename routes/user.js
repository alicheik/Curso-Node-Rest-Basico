
const{Router}=require('express');
const router =Router();

const { usuariosGet,
     usuariosPut,
     usuariosPatch,
     usuariosDelete,
     usuariosPost } = require('../controllers/user');

router.get('/',usuariosGet);

router.put('/?:id',usuariosPut);
router.post('/',usuariosPost);
router.patch('/',usuariosPatch);
router.delete('/',usuariosDelete);
module.exports =router;