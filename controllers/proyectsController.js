const Proyectos = require('../models/Proyects');
const Tareas = require('../models/Tareas');
const slug = require('slug');

exports.proyectsHome = async(req, res) =>{

    const proyectos = await Proyectos.findAll();

    res.render('index',{
        nombrePagina : 'Proyectos ',
        proyectos 
    });
};

exports.formProyect = async (req,res) =>{
    const proyectos = await Proyectos.findAll();
    res.render('newProyect',{
        nombrePagina : 'Nuevo proyecto',
        proyectos
    });
};

exports.newProyect = async (req,res) =>{
  
   const proyectos = await Proyectos.findAll();
   const {nombre} = req.body;
   let errores = [];
 
   if(!nombre){ 
        errores.push({'texto': 'Agrega nombre al proyecto'});
   }

   if(errores.length > 0){
        res.render('newProyect',{
            nombrePagina: 'Nuevo proyecto',
            errores,
            proyectos
        })
    }
    else{
        // no hay errores, a la bd
         await Proyectos.create({nombre});
        res.redirect('/');
    }
}

exports.proyectoPorUrl = async (req, res) => {
 
    const proyectosPromise =  Proyectos.findAll();

    const proyectoPromise =  Proyectos.findOne({
        where : {
            url: req.params.url
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    // Consultar tareas

    const tareas = await Tareas.findAll({
        where : {
            proyectoId : proyecto.id
        },
        include: [
            {
                model: Proyectos // similar a join de sequelize
            }
        ]
    })

   if(!proyecto) return next();

   res.render('tareas',{
       nombrePagina : 'Tareas del proyecto',
       proyecto, // se renderiza para utilizar en el pug
       proyectos,
       tareas
   })

}

exports.formularioEditar = async (req,res) => {
    
    const proyectosPromise =  Proyectos.findAll();

    const proyectoPromise =  Proyectos.findOne({
        where : {
            id: req.params.id
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    res.render('newProyect',{
        nombrePagina : 'Editar Proyecto',
        proyectos,
        proyecto
    })

}

exports.actualizarProyecto = async (req,res) =>{
  
    const proyectos = await Proyectos.findAll();
    const {nombre} = req.body;
    let errores = [];
  
    if(!nombre){ 
         errores.push({'texto': 'Agrega nombre al proyecto'});
    }
 
    if(errores.length > 0){
         res.render('newProyect',{
             nombrePagina: 'Nuevo proyecto',
             errores,
             proyectos
         })
     }
     else{
         // no hay errores, a la bd
        await Proyectos.update(
            {nombre: nombre},
            {where: { id: req.params.id}}
            );
         res.redirect('/');
     }
 }

 exports.eliminarProyecto = async(req,res,next) => {

    // req y query o params
     console.log(req);

     const {urlProyecto} = req.query;
     const resultado = await Proyectos.destroy({where:{urL : urlProyecto} })

     if(!resultado) return next();

     res.status(200).send('Proyecto eliminado correctamente');
 }