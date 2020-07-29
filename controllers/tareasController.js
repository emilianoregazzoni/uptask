const Proyectos = require('../models/Proyects');
const Tareas = require('../models/Tareas');
  
exports.agregarTarea = async (req, res) => {

      // me traigo el proyecto seleccionado
      const proyecto = await Proyectos.findOne({where: { url: req.params.url}});

      /*console.log(proyecto);
      console.log(req.body);
    */
   
      const {tarea} = req.body;
   
      //estado incompleto e id referencia del proyecto
      const estado = 0;
      const proyectoId = proyecto.id;
   
      //insert a la bd 
      const resultado = await Tareas.create({tarea, estado, proyectoId});
   
      if(!resultado) {
           return next();
      } 
   
      res.redirect(`/proyectos/${req.params.url}`);
 
}