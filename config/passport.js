const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Referencia al modelo

const Usuarios = require('../models/Usuarios');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async(email, password, done) =>{
            try{
                const usuario = await Usuarios.findOne({
                    where: {email: email}
                });
                if(!usuario.verificarPassword(password)){
                    return done(null, false, {
                        message: 'Password incorrecto'
                    })
                }
                return done(null, usuario);
            }catch(error){
                return done(null, false, {
                    message: 'La cuenta no existe'
                })
            }
        }
    )
);

// serializar y deserializar

passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
})

passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
})

module.exports = passport;