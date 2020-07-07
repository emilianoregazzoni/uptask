exports.proyectsHome = (req, res) =>{
    res.render('index',{
        nombrePagina : 'Proyectos'
    });
};

exports.nosotros = (req, res) =>{
    res.send("Somos nosotros");
};