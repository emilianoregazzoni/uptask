const Proyectos = require('../models/Proyects');
const slug = require('slug');

exports.proyectsHome = (req, res) =>{
    res.render('index',{
        nombrePagina : 'Proyectos'
    });
};

exports.formProyect = (req,res) =>{
    res.render('newProyect',{
        nombrePagina : 'Nuevo proyecto'
    });
};

exports.newProyect = async (req,res) =>{
   //res.send('Se envio ok')
   // Enviar a la consola lo que escribio
   //console.log(req.body);

   const {nombre} = req.body;

   let errores = [];
 
   if(!nombre){ 
        errores.push({'texto': 'Agrega nombre al proyecto'});
   }

   if(errores.length > 0){
        res.render('newProyect',{
            nombrePagina: 'Nuevo proyecto',
            errores 
        })
    }
    else{
        // no hay errores, a la bd
      //  const url = slug(nombre).toLowerCase();
        const proyecto = await Proyectos.create({ nombre/*, url*/ });
        res.redirect('/');
     
       /* .then(() => console.log('Insertado correctamente'))
        .catch(error => console.log(error));*/
    }
};