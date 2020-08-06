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


exports.cambiarEstadoTarea = async (req, res) => {
    const {id} = req.params;
    console.log(id);
    const tarea = await Tareas.findOne({where:{ id: id}});
    //console.log(tarea);
    let estado = 0;

    if(tarea.estado === estado){
      estado = 1;
    }
    tarea.estado = estado;
  
    const resultado = await tarea.save();

    if(!resultado) return next();

    res.status(200).send('Actualizado');

}

exports.eliminarTarea = async (req,res) => {
  const {id} = req.params;
  const resultado = await Tareas.destroy({where:{id}});

  if(!resultado) return next();

  res.status(200).send('Tarea eliminada');
}