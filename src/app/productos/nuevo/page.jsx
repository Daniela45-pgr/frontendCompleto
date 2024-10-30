"use client"
import axios from "axios";

 async function guardarProducto(e){
 e.preventDefault();
 console.log("funcion guardar producto");
 const url="http://localhost:3000/productos/nuevoProducto"
 const datos={
    nombre:document.getElementById("nombre").value,
    precio:document.getElementById("precio").value,
    stock:document.getElementById("stock").value
 }
 //console.log(datos);
 
 const respuesta= await axios.post(url,datos);
 console.log(respuesta);
 location.replace("http://localhost:3001/productos/mostrar")
 
 
}
export default function Nuevo (){
    return (
        <div className="m-0 row row-justify-contebt">
            <form onSubmit={guardarProducto} action="" className="col-6 mt-5" >
                <div className="card">
                    <div className="card-header">
                        <h1>Nuevo Producto</h1>
                    </div>
                    <div className="car-body">
                        <input style={{height:"70px"}} className="form-control mb-3" type="text" id="nombre" placeholder="Nombre" autoFocus />
                        <input style={{height:"70px"}} className="form-control mb-3" type="text" id="precio" placeholder="Precio" />
                        <input style={{height:"70px"}} className="form-control mb-3" type="text" id="stock" placeholder="Stock" />
                    </div>
                    <div className="card-footer">
                        <button type="submit" style={{height:"50px"}} className="btn btn-primary col-12">Guardar producto</button>
                    </div>
                </div>
            </form>
        </div>
    )
}