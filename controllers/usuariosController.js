const Usuarios = require('../models/Usuarios'); 

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
};