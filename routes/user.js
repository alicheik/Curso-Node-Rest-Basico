
const{Router}=require('express');
const { check } = require('express-validator');
const router =Router();

const { usuariosGet,
     usuariosPut,
     usuariosPatch,
     usuariosDelete,
     usuariosPost } = require('../controllers/user');
const { esRoleValido, emailExiste,existeUserID } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


router.get('/',usuariosGet);

router.put('/:id',[
     check('id','No es un ID valido').isMongoId(),
     check('id').custom(existeUserID),
     check('role').custom(esRoleValido),
     validarCampos,
],usuariosPut);
router.post('/',[
                    check('name','El nombre es Obligatorio ').not().isEmpty(),
                    check('password','El password debe de mas de 6').isLength({min:6}),
                    check('email','Correo no valido').isEmail(),
                    check('email').custom(emailExiste),
                    //check('role','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
                    check('role').custom(esRoleValido),
                    validarCampos,
               ],usuariosPost);
// router.post('/',usuariosPost);
router.patch('/',usuariosPatch);
router.delete('/:id',[
     check('id','No es un ID valido').isMongoId(),
     check('id').custom(existeUserID),
     validarCampos
],usuariosDelete);
module.exports =router;