import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar){
    btnEliminar.addEventListener('click', e=> {
        const urlProyecto = e.target.dataset.proyectoUrl;

        // console.log('Diste click en eliminar');
        Swal.fire({
             title: '¿Desea eliminar el proyecto?',
             text: "Un proyecto eliminado no se puede recuperar",
             icon: 'warning',
             showCancelButton: true,
             confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
             confirmButtonText: 'Si, eliminar',
             cancelButtonText: 'No, Cancelar'
       }).then((result) => {
         if (result.value) {
             // enviar a axios eliminado
           const url= `${location.origin}/proyectos/${urlProyecto}`;

           //console.log(url);
           axios.delete(url,{params: {urlProyecto}})
           .then(function(respuesta){
            console.log(respuesta);

            Swal.fire(
                'Eliminado',
                 respuesta.data,// 'El proyecto ha sido borrado',
                'success'
          );
                setTimeout(() => {
                    window.location.href='/';
                }, 1000);

           })
           .catch(() => {Swal.fire({
               type: 'error',
               title: 'Hubo un error',
               text: 'No se pudo eliminar proyecto '
           })
           })

    
         }
       })
     })
}

export default btnEliminar; 