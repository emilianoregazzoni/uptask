import axios from "axios";
import Swal from 'sweetalert2';
import {actualizarAvance} from '../funciones/avance';

const tareas = document.querySelector('.listado-pendientes'); 

if(tareas){
    tareas.addEventListener('click', e=>{
        //console.log(e.target.classList); 
        if(e.target.classList.contains('fa-check-circle')){
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            console.log(idTarea);
            // request hacia tarea

            const url = ` ${location.origin}/tareas/${idTarea} `;
           // console.log(url);

           axios.patch(url,{idTarea})
            .then(function(respuesta){
                    //console.log(respuesta);
                    if(respuesta.status === 200){
                        icono.classList.toggle('completo');
                        actualizarAvance();
                    } 
            })
        }
        if(e.target.classList.contains('fa-trash')){
           
        
           const tareaHTML = e.target.parentElement.parentElement,
                    idTarea = tareaHTML.dataset.tarea;
                         // console.log('Diste click en eliminar');
                Swal.fire({
                    title: '¿Desea eliminar esta Tarea?',
                    text: "Una tarea eliminada no se puede recuperar",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, eliminar',
                    cancelButtonText: 'No, Cancelar'
            }).then((result) => {
                if (result.value) 
                {
                    const url = ` ${location.origin}/tareas/${idTarea} `;
                    axios.delete (url, {params: { idTarea}})
                    .then(function(respuesta){
                        if(respuesta.status === 200){ // elimino nodo
                            tareaHTML.parentElement.removeChild(tareaHTML);
                            Swal.fire(
                                 'Tarea eliminada',
                                 respuesta.data,
                                 'success'
                            )
                            actualizarAvance();
                        }
                    });
                }
            })

        }
    });
}


export default tareas;