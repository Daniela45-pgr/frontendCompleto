"use client"
import axios from "axios";

 async function guardarUsuario(e){
 e.preventDefault();
 console.log("funcion guardar usuario");
 const url="http://localhost:3000/usuarios/nuevoUsuario"
 const datos={
    nombre:document.getElementById("nombre").value,
    usuario:document.getElementById("usuario").value,
    password:document.getElementById("password").value
 }
 //console.log(datos);
 
 const respuesta= await axios.post(url,datos);
 console.log(respuesta);
 location.replace("http://localhost:3001/usuarios/mostrar")
 
 
}
export default function Nuevo (){
    return (
        <div className="m-0 row row-justify-contebt">
            <form onSubmit={guardarUsuario} action="" className="col-6 mt-5" >
                <div className="card">
                    <div className="card-header">
                        <h1>Nuevo usuario</h1>
                    </div>
                    <div className="car-body">
                        <input style={{height:"70px"}} className="form-control mb-3" type="text" id="nombre" placeholder="Nombre" autoFocus />
                        <input style={{height:"70px"}} className="form-control mb-3" type="text" id="usuario" placeholder="Usuario" />
                        <input style={{height:"70px"}} className="form-control mb-3" type="text" id="password" placeholder="Password" />
                    </div>
                    <div className="card-footer">
                        <button type="submit" style={{height:"50px"}} className="btn btn-primary col-12">Guardar usuario</button>
                    </div>
                </div>
            </form>
        </div>
    )
}