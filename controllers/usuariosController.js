const Usuarios = require('../models/Usuarios'); 
const enviarEmail = require('../handlers/email');

exports.formCrearCuenta = (req,res) => {
    res.render('crearCuenta',{
        nombrePagina: 'Crear cuenta en Uptask'
    })
};

exports.iniciarSesion = (req,res) => {
    const { error } = res.locals.mensajes;
    res.render('iniciarSesion',{
        nombrePagina: 'Inicia sesion en Uptask',
        error 
    })
}

exports.crearCuenta = async (req,res) => {
    //console.log(req.body);
    const {email, password} = req.body;

    try{ // creo usuario
        await Usuarios.create({
            email,
            password
        });

        // crear url de confirmar
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

        // crear objeto usuario
        const usuario = {
            email
        }
        // enviar mail

        await enviarEmail.enviar({
            usuario,
            subject: 'Confirmar cuenta UpTask',
            confirmarUrl,
            archivo: 'confirmar-cuenta'
        })

        // redirigir al usuario 

        req.flash('correcto','Enviamos un mail de confirmación a tu cuenta')

        res.redirect('/iniciar-sesion')
    }catch(error){
        req.flash('error',error.errors.map(error => error.message));
        res.render('crearCuenta', {
            mensajes: req.flash() ,
            nombrePagina: 'Crear cuenta en Uptask',
            email : email,
            password : password
        })
    }
}

exports.formRestablecerPassword =  (req,res) =>{
    res.render('reestablecer',{
        nombrePagina: 'Restablecer tu password'
    })
}

// actualizo estado cuenta

exports.confirmarcuenta = async(req,res) => {
   // res.json(req.params.correo);

   const usuario = await Usuarios.findOne({
       where:{
           email: req.params.correo
       }
   })

   if(!usuario){
       req.flash('error','Esa cuenta no existe');
       res.redirect('/crear-cuenta');
   }

   usuario.activo = 1;
   await usuario.save();

   req.flash('correcto','La cuenta ha sido activada correctamente');
   res.redirect('/iniciar-sesion');
}